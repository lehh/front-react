import React, { useState } from 'react';
import { logIn as logInRequest } from '../requests/user';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';

type LoginProps = {
  onSuccessfulLogin(arg0: string): void;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Login = (props: LoginProps) => {
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');
  const [error, setError] = useState();

  const tryLogIn = async () => {
    // Didn't do validations for simplicity
    
    logInRequest(user, password)
      .then((result) => {
        setError(undefined);
        props.onSuccessfulLogin(result.login);
      })
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <Container className="justify-content-center p-4 d-flex">
      <form
        id="login-form"
        className="form-horizontal"
        onSubmit={(event) => {
          event.preventDefault();
          tryLogIn();
        }}
      >
        <Row>
          <Alert variant="danger" hidden={!error}>
            {error}
          </Alert>
        </Row>

        <Row className="form-group">
          <input
            type="text"
            placeholder="Login"
            value={user}
            onChange={(event) => setUser(event.target.value)}
          ></input>
        </Row>

        <Row className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          ></input>
        </Row>

        <Row className="form-group pull-right">
          <Button type="submit">Submit</Button>
        </Row>
      </form>
    </Container>
  );
};

export default Login;
