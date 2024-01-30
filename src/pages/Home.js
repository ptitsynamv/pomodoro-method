import Login from '../components/login/Login';
import Header from '../components/header/Header';
import useLogin from '../hooks/login.hook';

const Home = () => {
  const {
    token,
    logout,
    simpleLoginUser,
    googleLoginUser,
    facebookLoginUser,
    stateProcess,
  } = useLogin();

  if (!token) {
    return (
      <Login
        simpleLoginUser={simpleLoginUser}
        googleLoginUser={googleLoginUser}
        facebookLoginUser={facebookLoginUser}
        stateProcess={stateProcess}
      />
    );
  }

  return (
    <>
      <Header logout={logout} />
    </>
  );
};

export default Home;
