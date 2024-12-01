/**
 * @returns {Promise<import('../model/profile-payload').Profile>}
 */
export function getProfile() {
  return fetch('/api/auth/profile').then((res) => {
    return res.ok ? res.json() : Promise.reject('get profile fail');
  });
}
