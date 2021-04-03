import React, { useEffect, useState } from 'react';
import { Attendance } from '../types/attendance.type';
import { getAllAttendances } from '../requests/attendance';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const ListAttendance = () => {
  const [attendances, setAttendances] = useState([] as Attendance[]);

  useEffect(() => {
    getAllAttendances().then((attendanceList) => {
      setAttendances(attendanceList);
    });
  }, []);

  return (
    <div>
      <h4>Attendances</h4>

      <Table>
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
                <td>{attendance.duration ?? '-'}</td>
                <td>
                  {attendance.services.map((service, index) => {
                    return (
                      <span key={index}>
                        Service {service.id} <br />
                        Comission {service.commission} % <br />
                      </span>
                    );
                  })}
                </td>
                <td>
                  <Button>Start</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default ListAttendance;
