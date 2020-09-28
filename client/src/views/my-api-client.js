import axios from 'axios';

export const MyApiClient = axios.create({
  baseURL: "https://bubble-henri-app.herokuapp.com/",
  timeout: 300000,
  headers: {'X-Custom-Header': 'foobar'}
});