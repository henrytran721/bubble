import axios from 'axios';

export const MyApiClient = axios.create({
  baseURL: "http://54.153.93.78",
  timeout: 300000,
  headers: {'X-Custom-Header': 'foobar'}
});