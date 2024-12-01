// @ts-check
import React, { useRef, useState, useEffect } from 'react';
import { TodoRow } from '../todo-row/todo-row';
import { useTabState } from '../../model/app/context';
import { fetchReadTodo } from '../../service/read-todo';
import { delay } from '../../components/delay/delay';

/** @param {Object} param0
 * @param {import('../../model/global-state').TodoState} param0.todoPayload
 * @param {React.Dispatch<React.SetStateAction<import('../../model/global-state').TodoState>>} param0.setTodoPayload
 * @param {(param: import('../../model/global-state').Todo)=>void} param0.edit
 * @param {(param: number)=>void} param0.del
 * @param {number} param0.userId
 * */
export function TodoListInfinite({ todoPayload, setTodoPayload, edit, del, userId }) {
  const [loading, setLoading] = useState(false);
  const { tabState } = useTabState();
  const todoListsRef = useRef(null);

  function getApi(limit = 2) {
    let api = `/api/todo?userId=${userId}&limit=${limit}&skip=${todoPayload.todos.length}`;
    switch (tabState) {
      case 'all':
        api;
        break;
      case 'pending':
        api = `${api}&completed=false`;
        break;
      case 'completed':
        api = `${api}&completed=true`;
        break;
    }
    return api;
  }

  function loadMore(todoPayload, setTodoPayload) {
    let ori = todoPayload;
    return fetchReadTodo(getApi())
      .then(newPayload => {
        setTodoPayload({ todos: [...ori.todos, ...newPayload.todos], total: newPayload.total });
      })
      .catch(errMsg => alert(errMsg));
  }

  function handleScroll() {
    if (loading || todoPayload.total === todoPayload.todos.length) return;

    if (todoListsRef.current.scrollTop + todoListsRef.current.clientHeight > todoListsRef.current.scrollHeight * 0.99) {
      setLoading(true);
      loadMore(todoPayload, setTodoPayload).finally(() => {
        setLoading(false);
      });
    }
  }

  useEffect(() => {
    console.log('init');
    todoListsRef.current.addEventListener('scroll', handleScroll);
    return () => {
      todoListsRef.current.removeEventListener('scroll', handleScroll);
    };
  }, [todoPayload]);

  // useEffect(() => {
  //   const elm = todoListsRef.current;

  //   function handleScroll() {
  //     // TODO : edge case, if init is 0
  //     if (
  //       loading ||
  //       todoPayload.todos.length === todoPayload.total ||
  //       todoListsRef.current.scrollTop + todoListsRef.current.clientHeight < todoListsRef.current.scrollHeight * 0.99
  //     )
  //       return;

  //     setLoading(true);

  //     Promise.all([
  //       fetchReadTodo(byTab)
  //         .then(payload => {
  //           setTodoPayload(payload);
  //         })
  //         .catch(errMsg => alert(errMsg))
  //         .finally(() => setLoading(false)),
  //       delay(3000),
  //     ]);
  //   }

  //   elm.addEventListener('scroll', handleScroll);

  //   return () => {
  //     elm.removeEventListener('scroll', handleScroll);
  //   };
  // }, [loading, todoPayload, byTab]);

  // useEffect(() => {
  //   let ignore = false;
  //   // 切換 tab 後，清空 list
  //   if (tabState !== previousTab.current) {
  //     setTodoPayload({ todos: [], total: null });
  //   }

  //   previousTab.current = tabState;

  //   // 切換 tab/page 打 API
  //   fetchReadTodo(byTab)
  //     .then(payload => {
  //       if (!ignore) {
  //         setTodoPayload(payload);
  //       }
  //     })
  //     .catch(errMsg => alert(errMsg));

  //   return () => {
  //     ignore = true;
  //   };
  // }, [tabState]);

  return (
    <div className="todoLists" ref={todoListsRef}>
      {(loading || todoPayload.total === null) && <div className="todoLists__nothing">Loading ...</div>}
      {todoPayload.total === 0 && <div className="todoLists__nothing">Nothing to do ...</div>}
      {todoPayload.todos.length > 0 &&
        todoPayload.todos.map(({ id, todo, completed }) => {
          // 權責：針對單一 todorow ，不要動到整個 todoList
          return (
            <>
              <TodoRow
                key={id}
                id={id}
                todo={todo}
                completed={completed}
                onEdit={editTodoItem => edit(editTodoItem)}
                onDelete={id => del(id)}
              />
            </>
          );
        })}
    </div>
  );
}
