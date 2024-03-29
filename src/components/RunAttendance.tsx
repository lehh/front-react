import React, { useEffect, useState } from 'react';
import { Attendance } from '../types/attendance.type';
import useAttendance from '../hooks/useAttendance';
import { secondsToTimeString } from '../utils/time.utils';
import { numberToBRLString } from '../utils/currency.utils';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

type RunAttendanceProps = {
  attendance: Attendance;
  onAttendanceFinished(): void;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const RunAttendance = (props: RunAttendanceProps) => {
  const { state, finishAttendance } = useAttendance({ attendance: props.attendance });
  const [attendanceIsFinished, setAttendanceIsFinished] = useState(false);

  useEffect(() => {
    state.timeLeft.totalSeconds === 0 ? endAttendance() : null;
  }, [state.timeLeft]);

  const endAttendance = () => {
    setAttendanceIsFinished(true);
    finishAttendance();
  };

  const sendFinishEvent = () => {
    props.onAttendanceFinished();
  };

  return (
    <Modal id="modal-run-attendance" show={true}>
      <Modal.Header>
        <Modal.Title>Attendance</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Time Left <br />
        {state.timeLeft.hours < 10 ? `0${state.timeLeft.hours}` : state.timeLeft.hours}:
        {state.timeLeft.minutes < 10 ? `0${state.timeLeft.minutes}` : state.timeLeft.minutes}:
        {state.timeLeft.seconds < 10 ? `0${state.timeLeft.seconds}` : state.timeLeft.seconds}
        <br />
        {state.timeLeft.totalSeconds === 0 ? 'Time is Up! The attendance is finished.' : null}
        <br />
        <br />
        {attendanceIsFinished ? (
          <div>
            Commission: {numberToBRLString(state.commission)} <br />
            Duration: {secondsToTimeString(state.duration)}
          </div>
        ) : null}
      </Modal.Body>

      <Modal.Footer>
        <Button hidden={attendanceIsFinished} onClick={endAttendance}>
          Finish Attendance
        </Button>
        <Button hidden={!attendanceIsFinished} onClick={sendFinishEvent}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RunAttendance;
