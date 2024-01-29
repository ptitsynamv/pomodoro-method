import { useState } from 'react';
import { useHttp } from './http.hook';

const useLogin = () => {
  const _apiBase = 'http://localhost:8080/login';

  const getToken = () => {
    const tokenString = localStorage.getItem('token'); // TODO:
    const userToken = JSON.parse(tokenString);
    return userToken?.token;
  };

  const [token, setToken] = useState(getToken());

  const { request, fakeRequest, clearError, stateProcess, setStateProcess } =
    useHttp();

  const saveToken = (userToken) => {
    localStorage.setItem('token', JSON.stringify(userToken)); // TODO:
    setToken(userToken.token);
  };

  const loginUser = async (credentials) => {
    const res = await fakeRequest(`${_apiBase}`, 'POST', {
      token: 'fake-token',
    });
    saveToken(res);
    return res;
  };

  const logout = () => {
    localStorage.clear('token'); // TODO:
    setToken(null);
  };

  return { loginUser, logout, token, stateProcess, setStateProcess };
};

export default useLogin;
