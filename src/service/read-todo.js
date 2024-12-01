// @ts-check

/**
 * @param {number} userId
 * @param {number} limit
 * @param {number} skip
 * @param {import("../model/app/content-state").TabState} tabState
 * @returns {Promise<import("../model/global-state").TodoState>}
 */
export function fetchReadTodo(userId, limit, skip, tabState) {
  // code review
  // const url = `/api/todo?userId=${userId}&limit=${limit}&skip=${skip}${
  //   tabState === 'all' ? '' : `&completed=${String(tabState === 'completed')}`
  // }`;

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
  return fetch(url).then(res => {
    return res.ok ? res.json() : Promise.reject('get todo fail');
  });
}
