import axios from 'axios';

export const MyApiClient = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 300000,
  headers: {'X-Custom-Header': 'foobar'}
});