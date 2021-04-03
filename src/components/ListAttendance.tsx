import React, { useEffect, useState } from 'react';
import { Attendance } from '../types/attendance.type';
import { getAllAttendances } from '../requests/attendance';
import { secondsToTimeString } from '../utils/time.utils';
import { numberToBRLString } from '../utils/currency.utils';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import RunAttendance from './RunAttendance';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const ListAttendance = () => {
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [startedAttendance, setStartedAttendance] = useState<Attendance>();

  useEffect(() => {
    loadAttendances();
  }, []);

  const loadAttendances = () => {
    getAllAttendances().then((attendanceList) => {
      setAttendances(attendanceList);
    });
  };

  const startAttendance = (attendance: Attendance) => {
    if (!startedAttendance) {
      setStartedAttendance(attendance);
    }
  };

  const finishAttendance = () => {
    setStartedAttendance(undefined);
    loadAttendances();
  };

  return (
    <div>
      <h4>Attendances</h4>

      <Table bordered id="table-attendances">
        <thead>
          <tr>
            <th>#</th>
            <th>Status</th>
            <th>Duration</th>
            <th>Services</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {attendances.map((attendance, index) => {
            return (
              <tr key={index}>
                <td>{attendance.id}</td>
                <td>{attendance.finished ? 'Finished' : 'Not Started'}</td>
                <td>{attendance.duration ? `${secondsToTimeString(attendance.duration)}`: '-'}</td>
                <td>
                  {attendance.services.map((service, index) => {
                    const price = numberToBRLString(service.price);
                    
                    return (
                      <span key={index}>
                        Service {service.id} <br />
                        Price {price} <br />
                        Comission {service.commission} % <br />
                        <br/>
                      </span>
                    );
                  })}
                </td>
                <td>
                  {attendance.finished ? (
                    '-'
                  ) : (
                    <Button onClick={() => startAttendance(attendance)}>Start</Button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      {startedAttendance ? (
        <RunAttendance attendance={startedAttendance} onAttendanceFinished={finishAttendance} />
      ) : null}
    </div>
  );
};

export default ListAttendance;
