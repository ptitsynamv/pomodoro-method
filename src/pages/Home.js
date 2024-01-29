import Login from '../components/login/Login';
import Header from '../components/header/Header';
import useLogin from '../hooks/login.hook';

const Home = () => {
  const { token, logout, loginUser, stateProcess } = useLogin();

  if (!token) {
    return <Login loginUser={loginUser} stateProcess={stateProcess} />;
  }

  return (
    <>
      <Header logout={logout} />
    </>
  );
};

export default Home;
