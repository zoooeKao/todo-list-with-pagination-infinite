// @ts-check
import { useEffect, useRef, useState } from 'react';
import { AddNewTodo } from '../../components/add-new-todo/add-new-todo';
import { delay } from '../../components/delay/delay';
import { TodoListTab } from '../../components/todo-list-tab/todo-list-tab';
import { TodoRow } from '../../components/todo-row/todo-row';
import { useTabState } from '../../model/app/context';
import { fetchCreateTodo } from '../../service/create-todo';
import { fetchDeletePendingCompletedTodo } from '../../service/delete-todo';
import { fetchDeleteTodoById } from '../../service/delete-todo-id';
import { fetchReadTodo } from '../../service/read-todo';
import { fetchEditTodo } from '../../service/update-todo';
import './todo-table.scss';

/** @param {Object} param0
 * @param {import('../../model/profile-payload').Profile['id']} param0.userId
 */
export const TodoInfiniteScroll = ({ userId }) => {
  // global state
  const { tabState, setTabState } = useTabState();
  // local state
  const [todoPayload, setTodoPayload] = useState(
    /** @type {import('../../model/global-state').TodoState} */ ({ todos: [], total: null }),
  );
  // Code Review : Create, Update, Delete, scroll 一次只能做一件事 -> 可行
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSubmittingRef = useRef(isSubmitting);
  isSubmittingRef.current = isSubmitting; // 與 isSubmitting 同步，避免重複發出請求
  const [addStatus, setAddStatus] = useState(/** @type {import('../../model/global-state').AddState} */ ('typing'));
  // const [isAddError, setIsAddError] = useState(null);
  const previousTab = useRef(/** @type {import('../../model/app/content-state').TabState} */ ('all'));
  const todoListsScrollRef = useRef(/** @type {null | HTMLDivElement} */ (null));
  // const isScrolling = useRef(false); // 透過 useRef 立即更新狀態，避免重複請求

  // handler
  // Code Review : 需要放到 useEffect 嗎？ click -> submit -> event handler -> no
  /**
   * @param {string} addTodoItem
   */
  function handleCreateTodo(addTodoItem) {
    setAddStatus('adding');

    // Code review : 有比較好的寫法嗎？
    // setTimeout(() => {
    //   fetchCreateTodo(addTodoItem, userId)
    //     .then(() => {
    //       setAddStatus('success');
    //       return fetchReadTodo(userId, 1, todoPayload.todos.length, tabState);
    //     })
    //     .then(newPayload => {
    //       setTodoPayload(prev => ({ todos: [...prev.todos, ...newPayload.todos], total: newPayload.total }));
    //     })
    //     .catch(errMsg => alert(errMsg))
    //     .finally(() => {
    //       setTimeout(() => {
    //         setAddStatus('typing');
    //       }, 500);
    //     });
    // }, 1000);

    // delay(1000)
    //   .fetchCreateTodo(addTodoItem, userId)
    //   .then(() => {
    //     setAddStatus('success');
    //     return fetchReadTodo(userId, 1, todoPayload.todos.length, tabState);
    //   })
    //   .then(newPayload => {
    //     setTodoPayload(prev => ({ todos: [...prev.todos, ...newPayload.todos], total: newPayload.total }));
    //   })
    //   .catch(errMsg => alert(errMsg))
    //   .finally(() => {
    //     setTimeout(() => {
    //       setAddStatus('typing');
    //     }, 500);
    //   });

    Promise.all([fetchCreateTodo(addTodoItem, userId), delay(2000)])
      .then(() => {
        setAddStatus('success');
        return fetchReadTodo(userId, 1, todoPayload.todos.length, tabState);
      })
      .then(newPayload =>
        setTodoPayload(prev => ({ todos: [...prev.todos, ...newPayload.todos], total: newPayload.total })),
      )
      .catch(() => setAddStatus('error'))
      .finally(() => setTimeout(() => setAddStatus('typing'), 1000));
  }

  // component TodoListTab
  function handleDeleteTabTodo() {
    setIsSubmitting(true);
    fetchDeletePendingCompletedTodo(userId, todoPayload.todos.length, 0, tabState)
      .then(() => fetchReadTodo(userId, todoPayload.todos.length, 0, tabState))
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
      .then(() => fetchReadTodo(userId, todoPayload.todos.length, 0, tabState))
      .then(payload => {
        setTodoPayload(payload);
      })
      .catch(errMsg => alert(errMsg))
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  /**
   * @param {number} id
   */
  function handleDeleteTodo(id) {
    setIsSubmitting(true);
    fetchDeleteTodoById(id)
      .then(() => fetchReadTodo(userId, todoPayload.todos.length, 0, tabState))
      .then(payload => {
        setTodoPayload(payload);
      })
      .catch(errMsg => alert(errMsg))
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  function handleClickTab(nextTab) {
    setTabState(nextTab);
    todoListsScrollRef.current.scrollTo(0, 0);
    previousTab.current = nextTab;
    let ignore = false;
    fetchReadTodo(userId, 7, 0, nextTab)
      .then(payload => {
        if (!ignore) {
          setTodoPayload(payload);
        }
      })
      .catch(errMsg => alert(errMsg));
    return () => {
      ignore = true;
    };
  }

  // effect
  useEffect(() => {
    let ignore = false;
    fetchReadTodo(userId, 7, 0, tabState)
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

  // backup
  // const loadMore = () => {
  //   return fetchReadTodo(userId, 2, todoPayload.todos.length, tabState)
  //     .then(newPayload => {
  //       setTodoPayload(prev => ({ todos: [...prev.todos, ...newPayload.todos], total: newPayload.total }));
  //     })
  //     .catch(errMsg => alert(errMsg));
  // };
  // useEffect(() => {
  //   // 切換 tab 後，(1)清空 list (2)捲動置頂
  //   if (tabState !== previousTab.current) {
  //     setTodoPayload({ todos: [], total: null });

  //     if (todoListsScrollRef.current) {
  //       todoListsScrollRef.current.scrollTo(0, 0);
  //     }
  //   }
  //   // 更新 previousTab 至最新狀態
  //   previousTab.current = tabState;
  // }, [tabState]);

  // useEffect(() => {
  //   let ignore = false;
  //   // 切換 tab 後重置
  //   if (todoPayload.todos.length === 0 && todoPayload.total === null) {
  //     fetchReadTodo(userId, 7, todoPayload.todos.length, tabState)
  //       .then(payload => {
  //         if (!ignore) {
  //           setTodoPayload(payload);
  //         }
  //       })
  //       .catch(errMsg => alert(errMsg));
  //   }
  //   return () => {
  //     ignore = true;
  //   };
  // }, [todoPayload]);

  useEffect(() => {
    // mount 載入 todoPayload，接著觸發 scroll 事件
    const handleScroll = () => {
      if (isSubmittingRef.current || todoPayload.total === todoPayload.todos.length) return;
      // if (todoPayload.total === todoPayload.todos.length) return;
      if (
        // !isScrolling.current &&
        todoListsScrollRef.current.scrollTop + todoListsScrollRef.current.clientHeight >
        todoListsScrollRef.current.scrollHeight * 0.99
      ) {
        setIsSubmitting(true);
        // isScrolling.current = true;
        fetchReadTodo(userId, 2, todoPayload.todos.length, tabState)
          .then(newPayload => {
            setTodoPayload(prev => ({ todos: [...prev.todos, ...newPayload.todos], total: newPayload.total }));
          })
          .catch(errMsg => alert(errMsg))
          .finally(() => {
            setIsSubmitting(false);
            // isScrolling.current = false;
          });
      }
    };

    // Code review : 切換到 pagination 顯示錯誤訊息 todoListsRef.current is null。為什麼用 ?. 就不會出錯 -> 元件卸載的時候會找不到 DOM，所以要先判斷 DOM 是否存在。
    const div = todoListsScrollRef.current;
    if (!div) return;
    div.addEventListener('scroll', handleScroll);
    return () => {
      div.removeEventListener('scroll', handleScroll);
    };
  }, [todoPayload]);

  return (
    <>
      <AddNewTodo
        // Code review : ternary operator
        onAdd={addTodoItem => (!isSubmitting ? handleCreateTodo(addTodoItem) : alert('add failed'))}
        addStatus={addStatus}
      />
      <TodoListTab
        tab={tabState}
        onTab={nextTab => {
          // Code review : 如果你用 event 而不是 effect 去處哩，你會發現你的程式碼會簡單很多。
          handleClickTab(nextTab);
        }}
        onClear={() => (!isSubmitting ? handleDeleteTabTodo() : undefined)}
      />
      <div className="todoLists" ref={todoListsScrollRef}>
        {todoPayload.total === null && <div className="todoLists__nothing">Loading ...</div>}
        {todoPayload.total === 0 && <div className="todoLists__nothing">Nothing to do ...</div>}
        {todoPayload.todos.length > 0 &&
          todoPayload.todos.map(({ id, todo, completed }) => {
            // 權責：針對單一 todorow ，不要動到整個 todoList
            return (
              <TodoRow
                key={id}
                id={id}
                todo={todo}
                completed={completed}
                onEdit={editTodoItem => handleEditTodo(editTodoItem)}
                onDelete={id => handleDeleteTodo(id)}
              />
            );
          })}
      </div>
      {isSubmitting && <div className="todoLists__nothing">Loading ...</div>}
    </>
  );
};
