import _axios from 'axios';

const axios = baseUrl => {
  const instance = _axios.create({
    baseURL: baseUrl || 'http://localhost:5000',
    timeout: 1000
  });
  return instance;
};

export { axios };

export default axios();
