import { Service } from './service.type';

export type Attendance = {
  id: number;
  finished: boolean;
  duration: number;
  services: Service[]
};
