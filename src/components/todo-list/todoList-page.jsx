// @ts-check
import React, { useRef } from 'react';
import { TodoRow } from '../todo-row/todo-row';

/** @param {Object} param0
 * @param {Array<import('../../model/global-state').Todo>} param0.todoList
 * @param {(param: import('../../model/global-state').Todo)=>void} param0.edit
 * @param {(param: number)=>void} param0.del
 */
export function TodoListPage({ todoList, edit, del }) {
  return (
    <div className="todoLists">
      {todoList.length === 0 && <div className="todoLists__nothing">Nothing to do ...</div>}
      {todoList.length > 0 &&
        todoList.map(({ id, todo, completed }) => {
          return (
            <TodoRow
              key={id}
              id={id}
              todo={todo}
              completed={completed}
              onEdit={editTodoItem => edit(editTodoItem)}
              onDelete={id => del(id)}
            />
          );
        })}
    </div>
  );
}
