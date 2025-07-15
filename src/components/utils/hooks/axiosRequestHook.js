import axios from 'axios';

const URL = 'https://api.swapzone.io/v1/exchange/';
const KEY = 'K6furAaqb';

const axiosRequest = (params) => {
  const { method, url, data, callback, signal } = params;

  const config = {
    method: method.toUpperCase(),
    url: URL + url,
    headers: { 'x-api-key': KEY },
    params: data,
    signal: signal,
  };

  axios(config)
    .then((response) => {
      if (callback) {
        callback(response.data);
      }
    })
    .catch((error) => {
      console.error('Error occurred while making request:', error);
    });
};

export default axiosRequest;
