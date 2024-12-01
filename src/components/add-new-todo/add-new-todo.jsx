// @ts-check
import { useState } from 'react';
import '../spinner/spinner.scss';

/** @param {Object} param0   權責：知道使用者輸入了什麼, 或者想成是程式開給使用者輸入的窗口
 * @param {(text: string) => void} param0.onAdd
 * @param {(import('../../model/global-state').)} param0.addStatus
 */
export const AddNewTodo = ({ onAdd, addStatus }) => {
  const [addTodoItem, setAddTodoItem] = useState('');

  return (
    <>
      <form
        className="form-todoAdd"
        onSubmit={e => {
          e.preventDefault();
          onAdd(addTodoItem);
          setAddTodoItem('');
        }}
      >
        <input
          type="text"
          className="form-todoAdd__input"
          value={String(addTodoItem)}
          onChange={e => setAddTodoItem(String(e.target.value))}
          readOnly={addStatus === 'adding' || addStatus === 'success'}
          required={addTodoItem.length === 0 || addStatus === 'typing'}
          autoFocus
        />

        {addStatus === 'typing' && (
          <button type="submit" className="form-todoAdd__btn">
            Add
          </button>
          // <div className="form-todoAdd__btn">
          //   <div className="form-todoAdd__check">✅</div>
          // </div>
        )}

        {addStatus === 'adding' && (
          <div className="form-todoAdd__btn">
            <div className="loader" />
          </div>
        )}

        {/* Question: 為什麽會偏上 */}
        {addStatus === 'success' && (
          <div className="form-todoAdd__btn">
            <div className="form-todoAdd__check">✅</div>
          </div>
        )}

        {addStatus === 'error' && (
          <div className="form-todoAdd__btn">
            <div className="form-todoAdd__check">❌</div>
          </div>
        )}
      </form>
    </>
  );
};
