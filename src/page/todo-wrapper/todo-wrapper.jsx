// @ts-check
import React, { useContext } from 'react';
import { ThemeContext, useLoadDataState } from '../../model/app/context';
import { TodoPagination } from './todo-pagination';
import { TodoInfiniteScroll } from './todo-infinite-scroll';
import './todo-table.scss';

/** @param {Object} param0
 * @param {import('../../model/profile-payload').Profile['id']} param0.userId
 */
export const TodoWrapper = ({ userId }) => {
  const { loadDataState } = useLoadDataState();
  const theme = useContext(ThemeContext);

  return (
    <>
      <div className={`todo-table todo-table--${theme}`}>
        <div className="todo-table__container">
          <h1 className="title">Todo List</h1>
          {loadDataState === 'pagination' ? <TodoPagination userId={userId} /> : <TodoInfiniteScroll userId={userId} />}
        </div>
      </div>
    </>
  );
};
