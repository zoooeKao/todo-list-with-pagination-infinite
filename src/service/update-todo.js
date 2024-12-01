// @ts-check

/**
 * @param {number} id
 * @param {boolean} completed
 * @param {string} todo
 * @returns {Promise<>}
 */
export function fetchEditTodo(id, completed, todo) {
  return fetch(`/api/todo/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ id: id, completed: completed, todo: todo }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => {
    return res.ok ? res.json() : Promise.reject(`Put id:${id} checked/todo API failed`);
  });
}
