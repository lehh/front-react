import React from 'react';
import useLoggedInUser from './hooks/useLoggedInUser';
import Home from './pages/Home';
import Login from './pages/Login';

const App: React.FC = () => {
  const { user, logIn, logOut } = useLoggedInUser();

  const logInUser = (user: string) => {
    logIn(user);
  };

  const logOutUser = () => {
    logOut();
  }

  if (user) return <Home onLogOut={logOutUser}/>;

  return <Login onSuccessfulLogin={logInUser} />;
};

export default App;
