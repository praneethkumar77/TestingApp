import React from 'react';
import {HomeScreen} from '../src/screens';

// Note: import explicitly to use the types shiped with jest.
import {it, test, expect, afterEach} from '@jest/globals';
import {fireEvent, render} from '@testing-library/react-native';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
// import  from 'jest-mock-axios';
import mockAxios, {AxiosMockAPI} from 'jest-mock-axios';
import axios from 'axios';
import {loginData, usersData} from './networkCalls';
import {checkLogin, getUsers} from './functions';

afterEach(() => {
  mockAxios.reset();
});

test('renders home', () => {
  render(<HomeScreen />).toJSON();
});

test('match home snapshot', () => {
  const tree = renderer.create(<HomeScreen />);
  expect(tree).toMatchSnapshot();
});

test('render form items', () => {
  const {getAllByText, getAllByTestId} = render(<HomeScreen />);
  getAllByTestId('user input');
  getAllByTestId('user pass');
  getAllByTestId('login button');
});

test('empty values validation', () => {
  const {getByTestId, getByText} = render(<HomeScreen />);
  fireEvent.press(getByTestId('login button'));
  getByText('Enter Valid Name');
  getByText('Enter Valid Password');
});

test('username validation', () => {
  const {getByTestId, getByText} = render(<HomeScreen />);
  fireEvent.changeText(getByTestId('user input'), 'fhfe7h');
  fireEvent.press(getByTestId('login button'));
  getByText('Enter Valid Name');
});

test('password validation', () => {
  const {getByTestId, getByText} = render(<HomeScreen />);
  fireEvent.changeText(getByTestId('user pass'), 'fhfe7hf+==');
  fireEvent.press(getByTestId('login button'));
  getByText('Enter Valid Password');
});

test('correct details validation', () => {
  const {getByTestId, getByText} = render(<HomeScreen />);
  const props = render(<HomeScreen />).toJSON();
  fireEvent.changeText(getByTestId('user input'), 'kminchell');
  fireEvent.changeText(getByTestId('user pass'), '0lelplR');
  fireEvent.press(getByTestId('login button'));
});

// const UppercaseProxy = (clientMessage: any) => {
//   // requesting data from server
//   let axiosPromise = axios
//     .post('https://dummyjson.com/auth/login', {clientMessage})
//     .then(result => result.data)
//     .catch(err => err);

//   // converting server response to upper case
//   // axiosPromise = axiosPromise.then(serverData => serverData.data);

//   // returning promise so that client code can attach `then` and `catch` handler
//   return axiosPromise;
// };

// it('send data to api', async () => {
//   const {getByTestId, getByText} = render(<HomeScreen />);
//   const props = render(<HomeScreen />).toJSON();
//   fireEvent.changeText(getByTestId('user input'), 'kminchell');
//   fireEvent.changeText(getByTestId('user pass'), '0lelplR');
//   fireEvent.press(getByTestId('login button'));
//   let requestBody = JSON.stringify({
//     username: 'kminchelle',
//     password: '0lelplR',
//   });

//   let catchFn = jest.fn(),
//     thenFn = jest.fn();

//   // using the component, which should make a server response
//   // let clientMessage = 'client is saying hello!';

//   UppercaseProxy(requestBody).then(thenFn).catch(catchFn);
//   expect(mockAxios.post).toHaveBeenCalledTimes(1);
//   await expect(mockAxios.post).toHaveBeenCalledWith(
//     'https://dummyjson.com/auth/login',
//     {body: requestBody},
//   );

//   let responseObj = {
//     id: 15,
//     username: 'kminchelle',
//     email: 'kminchelle@qq.com',
//     firstName: 'Jeanne',
//     lastName: 'Halvorson',
//     gender: 'female',
//     image: 'https://robohash.org/autquiaut.png',
//     token:
//       'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsInVzZXJuYW1lIjoia21pbmNoZWxsZSIsImVtYWlsIjoia21pbmNoZWxsZUBxcS5jb20iLCJmaXJzdE5hbWUiOiJKZWFubmUiLCJsYXN0TmFtZSI6IkhhbHZvcnNvbiIsImdlbmRlciI6ImZlbWFsZSIsImltYWdlIjoiaHR0cHM6Ly9yb2JvaGFzaC5vcmcvYXV0cXVpYXV0LnBuZyIsImlhdCI6MTY5MTA0MzE5MSwiZXhwIjoxNjkxMDQ2NzkxfQ.i2c3xYLKyCE5uaZ_hR9cMwLrDT15fvqbSb1dYPywWUI',
//   };
//   mockAxios.mockResponse({data: responseObj});

//   expect(thenFn).toHaveBeenCalledWith(responseObj);

//   expect(catchFn).not.toHaveBeenCalled();
// });

test('login id check', async () => {
  const {getByTestId, getByText} = render(<HomeScreen />);
  fireEvent.changeText(getByTestId('user input'), 'kminchelle');
  fireEvent.changeText(getByTestId('user pass'), '0lelplR');
  fireEvent.press(getByTestId('login button'));
  // const users = [
  //   {
  //     avatar: 'https://reqres.in/img/faces/7-image.jpg',
  //     email: 'michael.lawson@reqres.in',
  //     first_name: 'Michael',
  //     id: 7,
  //     last_name: 'Lawson',
  //   },
  // ];
  // const resp = {
  //   page: 2,
  //   per_page: 6,
  //   total: 12,
  //   total_pages: 2,
  //   data: users,
  // };

  const resp = [
    {
      id: 15,
      username: 'kminchelle',
      email: 'kminchelle@qq.com',
      firstName: 'Jeanne',
      lastName: 'Halvorson',
      gender: 'female',
      image: 'https://robohash.org/autquiaut.png',
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsInVzZXJuYW1lIjoia21pbmNoZWxsZSIsImVtYWlsIjoia21pbmNoZWxsZUBxcS5jb20iLCJmaXJzdE5hbWUiOiJKZWFubmUiLCJsYXN0TmFtZSI6IkhhbHZvcnNvbiIsImdlbmRlciI6ImZlbWFsZSIsImltYWdlIjoiaHR0cHM6Ly9yb2JvaGFzaC5vcmcvYXV0cXVpYXV0LnBuZyIsImlhdCI6MTY5MTU1OTQ4OCwiZXhwIjoxNjkxNTYzMDg4fQ.trV3Z6acmqFi1fOQ4b2ETJVVNrHVTB4lz9WueUU9P5U',
    },
  ];

  // await expect(mockAxios.post).toHaveBeenCalledWith(
  //   'https://dummyjson.com/auth/login',
  //   {
  //     body: {
  //       username: 'kminchelle',
  //       password: '0lelplR',
  //     },
  //   },
  // );
  mockAxios.post.mockResolvedValue(resp);

  // expect(resp).toHaveBeenCalled();
  const apiData = await checkLogin();
  // console.log('dvklkevw', apiData);

  expect(apiData).toEqual(loginData);
});
