import React from 'react';
import useLoggedInUser from './hooks/useLoggedInUser';
import Home from './pages/Home';
import Login from './pages/Login';

const App: React.FC = () => {
  const { user } = useLoggedInUser();

  if (user) return <Home />;

  return <Login />;
};

export default App;
