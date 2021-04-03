import { sendRequest } from './base';
import { Attendance } from '../types/attendance.type';

const getAllAttendancesQuery = () => {
  return `query {
    getAllAttendances{
      id
      finished
      duration
      services {
        id
        time
        commission
        price
      }
    }
  }`;
};

const createAttendanceMutation = () => {
  return `mutation ($servicesIds: [Int!]!){
    createAttendance(servicesIds: $servicesIds){
      id
      finished
      duration
      services {
        price
      }
    }
  }`;
};

const updateAttendanceMutation = () => {
  return `
  mutation ($id: Int!, $finished: Boolean!, $duration: Float){
    updateAttendance(AttendanceInput: {id: $id, finished: $finished, duration: $duration})
  }`;
};

export const getAllAttendances = (): Promise<Attendance[]> => {
  return new Promise((resolve, reject) => {
    const body = {
      query: getAllAttendancesQuery(),
    };

    sendRequest(body)
      .then((data) => {
        resolve(data.getAllAttendances as Attendance[]);
      })
      .catch((errorMessage: string) => reject(errorMessage));
  });
};

export const createAttendance = (servicesIds: number[]): Promise<Attendance> => {
  return new Promise((resolve, reject) => {
    const body = {
      query: createAttendanceMutation(),
      variables: {
        servicesIds,
      },
    };

    sendRequest(body)
      .then((data) => {
        resolve(data.createAttendance as Attendance);
      })
      .catch((errorMessage: string) => reject(errorMessage));
  });
};

export const updateAttendance = (attendance: Attendance): Promise<number> => {
  return new Promise((resolve, reject) => {
    const { id, duration, finished } = attendance;

    const body = {
      query: updateAttendanceMutation(),
      variables: {
        id,
        duration,
        finished,
      },
    };

    sendRequest(body)
      .then((data) => {
        resolve(data.updateAttendance as number);
      })
      .catch((errorMessage: string) => reject(errorMessage));
  });
};
