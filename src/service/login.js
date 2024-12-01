// void 相當於 undefined，差別在於不在乎回傳什麼東西
/**
 * @param {string} username
 * @param {string} password
 * @returns {Promise<void>}
 */
export function login(username, password) {
  return fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({username: username, password: password}),
  }).then((res) => {
    return res.ok ? undefined : Promise.reject('login fail');
  });
}
