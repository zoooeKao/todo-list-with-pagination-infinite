// @ts-check

/**
 * @param {number} userId
 * @param {number} limit
 * @param {number} skip
 * @param {string} tabState
 * @returns {Promise<>}
 */
export function fetchDeletePendingCompletedTodo(userId, limit, skip, tabState) {
  let url = `/api/todo?userId=${userId}&limit=${limit}&skip=${skip}`;
  switch (tabState) {
    case 'all':
      url;
      break;
    case 'pending':
      url = `${url}&completed=false`;
      break;
    case 'completed':
      url = `${url}&completed=true`;
      break;
  }
  return fetch(url, {
    method: 'DELETE',
  }).then(res => {
    res.ok ? undefined : Promise.reject('delete fail');
  });
}
