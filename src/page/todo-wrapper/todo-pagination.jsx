// @ts-check
import './todo-table.scss';
import React, { useState, useEffect, useRef } from 'react';
import { mapTabToGetApi } from '../../model/mapTabToGetApi';
import { Pagination } from './pagination/pagination';
import { TodoListPage } from '../../components/todo-list/todoList-page';
import { TodoListTab } from '../../components/todo-list-tab/todo-list-tab';
import { fetchCreateTodo } from '../../service/create-todo';
import { fetchReadTodo } from '../../service/read-todo';
import { fetchDeletePendingCompletedTodo } from '../../service/delete-todo';
import { fetchEditTodo } from '../../service/update-todo';
import { fetchDeleteTodoById } from '../../service/delete-todo-id';
import { useTabState } from '../../model/app/context';
import { AddNewTodo } from '../../components/add-new-todo/add-new-todo';
import { LIMIT } from '../../model/magic-number';
import { delay } from '../../components/delay/delay';

/** @param {Object} param0
 * @param {import('../../model/profile-payload').Profile['id']} param0.userId
 */
export const TodoPagination = ({ userId }) => {
  // global state
  const { tabState, setTabState } = useTabState();
  // local state
  const [todoPayload, setTodoPayload] = useState(
    /** @type {import('../../model/global-state').TodoState} */ ({ todos: [], total: null }),
  );
  const [curPage, setCurPage] = useState(1);
  // Code Review : CUD 一次只能做一件事 -> 可行
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addStatus, setAddStatus] = useState(/** @type {import('../../model/global-state').AddState} */ ('typing'));
  const previousTab = useRef(/** @type {import('../../model/app/content-state').TabState} */ ('all'));

  let skip = (curPage - 1) * LIMIT;

  // handler
  // Code Review : 需要放到 useEffect 嗎？ click -> submit -> event handler -> no
  /**
   * @param {string} addTodoItem
   */
  function handleCreateTodo(addTodoItem) {
    setAddStatus('adding');

    Promise.all([fetchCreateTodo(addTodoItem, userId), delay(2000)])
      .then(() => {
        setAddStatus('success');
        return fetchReadTodo(userId, LIMIT, skip, tabState);
      })
      .then(newPayload => setTodoPayload(() => ({ todos: [...newPayload.todos], total: newPayload.total })))
      .catch(() => setAddStatus('error'))
      .finally(() => setTimeout(() => setAddStatus('typing'), 1000));
  }

  // component TodoListTab
  function handleDeleteTabTodo() {
    setIsSubmitting(true);
    fetchDeletePendingCompletedTodo(userId, LIMIT, skip, tabState)
      .then(() => fetchReadTodo(userId, LIMIT, skip, tabState))
      .then(payload => {
        setTodoPayload(payload);
      })
      .catch(errMsg => alert(errMsg))
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  /**
   * @param {import('../../model/global-state').Todo} editTodoItem
   */
  function handleEditTodo(editTodoItem) {
    setIsSubmitting(true);
    fetchEditTodo(editTodoItem.id, editTodoItem.completed, editTodoItem.todo)
      .then(() => fetchReadTodo(userId, LIMIT, skip, tabState))
      .then(payload => {
        setTodoPayload(payload);
      })
      .catch(errMsg => alert(errMsg))
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  /**
   * @param {import('../../model/global-state').Todo['id']} id
   */
  function handleDeleteTodo(id) {
    setIsSubmitting(true);
    fetchDeleteTodoById(id)
      .then(() => fetchReadTodo(userId, LIMIT, skip, tabState))
      .then(payload => {
        setTodoPayload(payload);
      })
      .catch(errMsg => alert(errMsg))
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  // effect
  useEffect(() => {
    let ignore = false;
    fetchReadTodo(userId, LIMIT, skip, tabState)
      .then(payload => {
        if (!ignore) {
          setTodoPayload(payload);
        }
      })
      .catch(errMsg => alert(errMsg));
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    // 切換 tab 後預設顯示第一頁
    if (tabState !== previousTab.current) setCurPage(1);
    // todoListsPageRef.current.scrollTo(0, 0);

    // 若使用者不是切換 tab, 而是切換 page, 所以需更新 previousTab
    previousTab.current = tabState;

    // 切換 tab/ page 打 API
    let ignore = false;
    fetchReadTodo(userId, LIMIT, skip, tabState)
      .then(payload => {
        if (!ignore) {
          setTodoPayload(payload);
        }
      })
      .catch(errMsg => alert(errMsg));
    return () => {
      ignore = true;
    };
  }, [tabState, curPage]);

  return (
    <>
      <AddNewTodo
        // Code review : ternary operator
        onAdd={addTodoItem => (!isSubmitting ? handleCreateTodo(addTodoItem) : undefined)}
        addStatus={addStatus}
      />
      <TodoListTab
        tab={tabState}
        onTab={nextTab => {
          setTabState(nextTab);
        }}
        onClear={() => (!isSubmitting ? handleDeleteTabTodo() : undefined)}
      />
      <TodoListPage
        todoList={todoPayload.todos ?? []}
        edit={editTodoItem => (!isSubmitting ? handleEditTodo(editTodoItem) : undefined)}
        del={id => (!isSubmitting ? handleDeleteTodo(id) : undefined)}
      />
      <Pagination
        total={todoPayload.total}
        limit={LIMIT}
        curPage={curPage}
        onPage={page => (!isSubmitting ? setCurPage(page) : undefined)}
      />
    </>
  );
};
