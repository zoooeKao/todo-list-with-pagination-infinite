// @ts-check
import React, { useContext, useState, useRef } from 'react';
import { LayoutContext } from '../../model/app/context';

/** @param {Object} param0
 * @param {number} param0.id
 * @param {string} param0.todo
 * @param {boolean} param0.completed
 * @param {(param: import('../../model/global-state').Todo) => void} param0.onEdit
 * @param {(param: number) => void} param0.onDelete
 */
export function TodoRow({ id, todo, completed, onEdit, onDelete }) {
  const layout = useContext(LayoutContext);
  const [editItem, setEditItem] = useState({ id: id, todo: todo, completed: completed });
  const [isEditing, setIsEditing] = useState(false);
  const itemHeightRef = useRef(null);

  const handleSaveSubmit = e => {
    e.preventDefault();
    onEdit(editItem);
    setIsEditing(!isEditing);
  };

  const handleEditSubmit = e => {
    e.preventDefault();
    setIsEditing(!isEditing);
    console.log('editId: ', id);
  };

  // className
  const isRowLayout = layout === 'row';
  const formClass = isRowLayout ? 'todoItem' : 'todoItemCard';
  const checkedClass = isRowLayout ? 'todoItem__checked' : 'todoItemCard__checked';
  const mainClass = isRowLayout ? 'todoItem__main' : 'todoItemCard__main';
  const todoClass = isRowLayout ? 'todoItem__todo' : 'todoItemCard__todo';
  const btnsClass = isRowLayout ? 'todoItem__btns' : 'todoItemCard__btns';
  const btnClass = isRowLayout ? 'todoItem__btn' : 'todoItemCard__btn';

  const handleInputTodoChange = e => setEditItem(prev => ({ ...prev, todo: e.target.value }));
  const handleCheckboxChange = () =>
    isEditing ? setEditItem(prev => ({ ...prev, completed: !prev.completed })) : undefined;

  return (
    <>
      <form className={formClass} onSubmit={isEditing ? handleSaveSubmit : handleEditSubmit} ref={itemHeightRef}>
        <input
          className={checkedClass}
          type="checkbox"
          checked={editItem.completed}
          disabled={!isEditing}
          onChange={handleCheckboxChange}
        />
        <div className={mainClass}>
          <input
            className={todoClass}
            type="text"
            value={editItem.todo}
            disabled={!isEditing}
            onChange={isEditing ? handleInputTodoChange : undefined}
          />
          <div className={btnsClass}>
            <button className={btnClass} type="submit">
              {isEditing ? 'Save' : 'Edit'}
            </button>
            <button
              className={btnClass}
              type="button"
              onClick={isEditing ? () => onDelete(id) : undefined}
              disabled={!isEditing}
            >
              Delete
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
