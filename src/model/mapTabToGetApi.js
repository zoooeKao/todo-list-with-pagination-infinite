// @ts-check
import { LIMIT } from './magic-number';
// import { fetchReadTodo } from '../service/read-todo';

const url = {
  byTab: '',
  byTabWithPage: '',
};

/**
 * @param {number} userId
 * @param {number} page
 * @param {import('./app/content-state').TabState} tab
 * @returns {import('./global-state').Url}
 */
export function mapTabToGetApi(userId, page, tab) {
  let skip = 0;
  skip = (page - 1) * LIMIT;

  // GET byTab : note default limit is 12
  switch (tab) {
    case 'all':
      url.byTab = `/api/todo?userId=${userId}&limit=999`;
      url.byTabWithPage = `/api/todo?userId=${userId}&limit=${LIMIT}&skip=${skip}`;

      break;
    case 'pending':
      url.byTab = `/api/todo?userId=${userId}&limit=999&completed=false`;
      url.byTabWithPage = `/api/todo?userId=${userId}&completed=false&limit=${LIMIT}&skip=${skip}`;
      break;
    case 'completed':
      url.byTab = `/api/todo?userId=${userId}&limit=999&completed=true`;
      url.byTabWithPage = `/api/todo?userId=${userId}&completed=true&limit=${LIMIT}&skip=${skip}`;
      break;
  }

  return url;
}
