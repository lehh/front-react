import { sendRequest } from './base';
import { Attendance } from '../types/attendance.type';

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
