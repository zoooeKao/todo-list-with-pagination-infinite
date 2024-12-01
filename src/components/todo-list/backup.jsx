// const todoListsRef = useRef(null);
// return (
//   <div className="todoLists" ref={todoListsRef}>
//     {todoList.length === 0 && <div className="todoLists__nothing">Nothing to do ...</div>}
//     {todoList.length > 0 &&
//       todoList.map(({ id, todo, completed }) => {
//         return (
//           <TodoRow
//             key={id}
//             id={id}
//             todo={todo}
//             completed={completed}
//             onEdit={editTodoItem => edit(editTodoItem)}
//             onDelete={id => del(id)}
//           />
//         );
//       })}
//   </div>
// );

export function TodoListPage({ todoList, edit, del }) {
  const todoListsPageRef = useRef(/** @type {null | HTMLDivElement} */ (null));

  return (
    <div className="todoLists" ref={todoListsPageRef}>
      {todoList.length === 0 && <div className="todoLists__nothing">Nothing to do ...</div>}
      {todoList.length > 0 &&
        todoList.map(({ id, todo, completed }) => {
          return (
            <TodoRow
              // key={`${id}-page`}
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

<div className="todoLists">
  {todoList.length === 0 && <div className="todoLists__nothing">Nothing to do ...</div>}
  {todoList.length > 0 &&
    todoList.map(({ id, todo, completed }) => {
      return (
        <TodoRow
          // key={`${id}-page`}
          key={id}
          id={id}
          todo={todo}
          completed={completed}
          onEdit={editTodoItem => edit(editTodoItem)}
          onDelete={id => del(id)}
        />
      );
    })}
</div>;
