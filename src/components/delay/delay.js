/**
 * @param {number} ms
 * @returns {Promise<any>}
 */
export const delay = ms => {
  return new Promise(res => {
    setTimeout(res, ms);
  });
};

// var delay = ms => {
//   return new Promise((resolve, reject)=>{
//     setTimeout(()=>resolve(console.log('success')), ms)
//   })
// }

// Promise.all([fetchApi(), delay(100)]).then(() => console.log('100ms'));

// setTimeout(() => {
//   console.log('hi');
//   setTimeout(() => console.log('hello'), 1000);
// }, 1000);

// delay(1000)
//   .then(() => {
//     console.log('hi');
//     return delay(1000);
//   })
//   .then(() => console.log('hello'));
