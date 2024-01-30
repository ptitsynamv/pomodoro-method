import PropTypes from 'prop-types';
import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import FacebookLogin from 'react-facebook-login';

import logo from '../../resources/img/logo.png';

const Login = ({
  simpleLoginUser,
  googleLoginUser,
  facebookLoginUser,
  stateProcess,
}) => {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const clientID = process.env.REACT_APP_FACEBOOK_CLIENT_ID;

  const handleSubmit = async (e) => {
    e.preventDefault();
    simpleLoginUser({ username, password });
  };

  const responseGoogle = async (credentialResponse) => {
    googleLoginUser(credentialResponse.credential);
  };

  const errorGoogle = (error) => {
    console.log({ error });
  };

  const responseFacebook = (response) => {
    const authInfo = {
      token: response.accessToken,
      email: response.email,
      name: response.name,
      picture: response.picture.data.url,
    };
    facebookLoginUser(authInfo);
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-10 w-auto" src={logo} alt="logo"></img>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Simple login</h3>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="mt-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setUserName(e.target.value)}
              ></input>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={stateProcess === 'loading'}
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
        <div className="mt-6">
          <GoogleLogin
            useOneTap={true}
            onSuccess={responseGoogle}
            onError={errorGoogle}
            theme="filled_black"
            size="large"
            width="380px"
          />
        </div>
        <div className="mt-6">
          <FacebookLogin
            appId={clientID}
            fields="name,email,picture"
            callback={responseFacebook}
            cssClass="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          />
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  loginUser: PropTypes.func,
  googleLoginUser: PropTypes.func,
  facebookLoginUser: PropTypes.func,
  stateProcess: PropTypes.string,
};

export default Login;
