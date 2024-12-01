// @ts-check

/**
 * @param {number} id
 * @returns {Promise<void>}
 */
export function fetchDeleteTodoById(id) {
  return fetch(`/api/todo/${id}`, {
    method: 'DELETE',
  }).then(res => {
    return res.ok ? undefined : Promise.reject('delete fail');
  });
}
