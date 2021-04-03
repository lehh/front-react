import React from 'react';
import useLoggedInUser from '../hooks/useLoggedInUser';
import CreateAttendance from '../components/CreateAttendance';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';

type HomeProps = {
  onLogOut(): void;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Home = (props: HomeProps) => {
  const { user } = useLoggedInUser();
  const userIsClient = user === 'client';

  return (
    <Container>
      <Row>Hello {user?.toUpperCase()}</Row>
      <Row>
        <Button variant="danger" id="log-out" onClick={props.onLogOut}>
          Log Out
        </Button>
      </Row>

      <div>Attendances:</div>

      {userIsClient ? <CreateAttendance /> : null}
    </Container>
  );
};

export default Home;
