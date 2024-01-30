import { useState } from 'react';
import { useHttp } from './http.hook';
import { googleLogout } from '@react-oauth/google';

import defaultUser from '../resources/img/default-user.png';

const useLogin = () => {
  const _apiBase = 'http://localhost:8080/login';
  const _storageKey = 'AuthData';

  const getToken = () => {
    const authData = JSON.parse(localStorage.getItem(_storageKey));
    return authData?.token;
  };

  const [token, setToken] = useState(getToken());
  const [authType, setAuthType] = useState();

  const { request, fakeRequest, stateProcess, setStateProcess } = useHttp();

  const saveAuthData = (authData) => {
    localStorage.setItem(_storageKey, JSON.stringify(authData));
    setToken(authData.token);
  };

  const simpleLoginUser = async (credential) => {
    const result = await fakeRequest(`${_apiBase}`, 'POST', {
      token: 'fake-token',
      email: 'fake@email.com',
      name: credential.username,
      picture: defaultUser,
    });
    saveAuthData(result);
    setAuthType('simple');
  };

  const googleLoginUser = async (credential) => {
    const loginUrl = process.env.REACT_APP_GOOGLE_LOGIN_URL;

    const result = await request(loginUrl, 'POST', {
      token: credential,
    });
    saveAuthData(result.data);
    setAuthType('google');
  };

  const facebookLoginUser = async (authInfo) => {
    saveAuthData(authInfo);
    setAuthType('facebook');
  };

  const logout = () => {
    localStorage.clear(_storageKey);
    switch (authType) {
      case 'google':
        googleLogout();
        break;
      case 'simple':
        break;
      case 'facebook':
        break;
      default:
    }
    setToken(null);
    setAuthType(null);
  };

  return {
    simpleLoginUser,
    googleLoginUser,
    facebookLoginUser,
    logout,
    token,
    stateProcess,
    setStateProcess,
  };
};

export default useLogin;
