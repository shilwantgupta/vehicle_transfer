import axios from 'axios';

const ajax = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default ajax;
