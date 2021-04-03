import { sendRequest } from './base';
import { Service } from '../types/service.type';

const allServicesQuery = (): string => {
  return `query{
    getAllServices{
      id
      price
      time
      commission
    }
  }`;
};

export const getAllServices = (): Promise<Service[]> => {
  return new Promise((resolve, reject) => {
    const body = {
      query: allServicesQuery(),
    };

    sendRequest(body)
      .then((data) => {
        resolve(data.getAllServices as Service[]);
      })
      .catch((errorMessage: string) => reject(errorMessage));
  });
};
