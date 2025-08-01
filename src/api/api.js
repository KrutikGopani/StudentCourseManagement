import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Update this to your .NET Core backend URL
});

export default API;
