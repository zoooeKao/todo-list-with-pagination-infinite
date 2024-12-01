// @ts-check

/**
 * @param {string} addTodoItem
 * @param {number} userId
 * @returns {Promise<import("../model/global-state").Todo>}
 */
export function fetchCreateTodo(addTodoItem, userId) {
  return fetch('/api/todo', {
    method: 'POST',
    body: JSON.stringify({
      todo: addTodoItem,
      completed: false,
      userId: userId,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => {
    return res.ok ? res.json() : Promise.reject('post todo fail');
  });
}
