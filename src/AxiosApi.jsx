import axios from 'axios';

export const URL = 'http://localhost:5050';

export const AxiosApi = axios.create({
  baseURL: URL,
    // headers: {
    //     'Content-Type': 'application/json',
    // }
});
