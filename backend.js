var axios = require('axios');
const getData = (data, resolve, reject) => {
  axios.get(data)
  .then((res) => {
    resolve(res.data);
  })
  .catch((err) => {
    reject(err);
  })
};

exports.run = (data) => {
  return new Promise((resolve, reject) => {
    getData(data, resolve, reject);
  });
}
