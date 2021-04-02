import { sendRequest } from './base';

type logInResult = {
  login: string;
};

const loginMutation = () => {
  return `mutation ($login: String!, $password: String!){
    login(login: $login, password: $password)
  }`;
};

export const logIn = (login: string, password: string): Promise<logInResult> => {
  return new Promise(async (resolve, reject) => {
    const body = {
      query: loginMutation(),
      variables: {
        login,
        password,
      },
    };

    sendRequest(body)
      .then((data) => {
        resolve(data as logInResult);
      })
      .catch((errorMessage) => {
        reject(errorMessage);
      });
  });
};
