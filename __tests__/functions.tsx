import axios from 'axios';
import mockAxios from 'jest-mock-axios';

// const axios = require('axios');

const checkLogin = async () => {
  const response = await axios.post('https://dummyjson.com/auth/login', {
    username: 'kminchel',
    password: '0lelplR',
  });

  console.log('dsvsvsvfff', response);
  return response;
};

const getUsers = async () => {
  const response = await axios.get('https://reqres.in/api/users?page=2');

  console.log('getUsers response', response.data[0].id);
  return response.data[0].id;
};

export {checkLogin, getUsers};
