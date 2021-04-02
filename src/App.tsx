import React from 'react';
import useLoggedInUser from './hooks/useLoggedInUser';
import Home from './pages/Home';
import Login from './pages/Login';

const App: React.FC = () => {
  const { user, logIn } = useLoggedInUser();

  const logInUser = (user: string) => {
    logIn(user);
  };

  if (user) return <Home />;

  return <Login onSuccessfulLogin={logInUser} />;
};

export default App;
