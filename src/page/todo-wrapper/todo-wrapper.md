# Todo Components

- Todo Wrapper (TodoTable)

  - Todo Status: all, pending, completed
  - Todo Display Type: pagination / infinite scroll (Navbar)
  - components
    - TodoPagination
      - const [todoList, setTodoList] = useState(); // pagination 頁面要顯示的資料
      - management the todo list itself
    - TodoScrollMore
      - const [todoListAmount, setTodoListAmount] = useState(); // infinite 頁面要顯示的資料
      - management the todo list itself

- page 或許可以用 custom hook
