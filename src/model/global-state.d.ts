/**
 * @typedef {Object} Url
 * @property {string} byTab delete pending/completed
 * @property {string} byTabWithPage for todoList 畫面顯示
 */
export type Url = {
  byTab: string;
  byTabWithPage: string;
};

/**
 * @typedef {object} Todo
 * @property {number} id
 * @property {string} todo
 * @property {boolean} completed
 */
export type Todo = {
  id: number;
  todo: string;
  completed: boolean;
};

/**
 * @typedef {object} TodoState
 * @property {array} todos
 * @property {number | null} total
 */
export type TodoState = {
  todos: Todo[];
  total: number | null;
};

export type AddState = 'typing' | 'adding' | 'success' | 'error';

export type Theme = 'white' | 'aquamarine';

export type Layout = 'row' | 'card';

export type TimeState = {
  hour: number;
  minute: number;
  second: number;
  ms: number;
};
