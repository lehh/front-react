import { useState } from 'react';

type LoggedInUserHook = {
  user: string | null;
  logIn: (user: string) => void;
  logOut: () => void;
};

const getLoggedInUser = () => {
  return localStorage.getItem('user');
};

const setLoggedInUser = (user: string) => {
  localStorage.setItem('user', user);
};

const removeLoggedInUser = () => {
  localStorage.removeItem('user');
};

const useLoggedInUser = (): LoggedInUserHook => {
  const [user, setUser] = useState(getLoggedInUser());

  return {
    user,
    logIn: (user: string) => {
      setLoggedInUser(user);
      setUser(user);
    },
    logOut: () => {
      removeLoggedInUser();
      setUser(null);
    },
  };
};

export default useLoggedInUser;
