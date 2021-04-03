import { useEffect, useState } from 'react';
import { updateAttendance } from '../requests/attendance';
import { Attendance } from '../types/attendance.type';
import { Service } from '../types/service.type';

type TimeLeft = {
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
};

type AttendanceHook = {
  state: {
    timeLeft: TimeLeft;
    commission: number;
    duration: number;
  };
  finishAttendance(): void;
};

type AttendanceHookProps = {
  attendance: Attendance;
};

const saveAttendance = (attendance: Attendance, duration: number): void => {
  const updatedAttendance = {
    id: attendance.id,
    finished: true,
    duration,
  } as Attendance;

  updateAttendance(updatedAttendance).then(() => {
    console.log('Attendance updated');
  });
};

const calculateTotalTime = (services: Service[]): number => {
  return services.reduce((prev, service) => prev + service.time, 0);
};

const calculateComission = (services: Service[]): number => {
  const percentage = services.reduce((prev, service) => prev + service.commission, 0);
  const totalPrice = services.reduce((prev, service) => prev + service.price, 0);

  return (percentage / 100) * totalPrice;
};

const useAttendance = (props: AttendanceHookProps): AttendanceHook => {
  const [attendance] = useState<Attendance>(props.attendance);
  const [commission] = useState(calculateComission(attendance.services));
  const [totalTime] = useState(calculateTotalTime(attendance.services));
  const [duration, setDuration] = useState(0);
  const [timeInterval, setTimeInterval] = useState<NodeJS.Timeout>();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    totalSeconds: totalTime,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const state = {
    timeLeft,
    commission,
    duration,
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft);
    }, 1000);

    setTimeInterval(interval);

    return () => clearInterval(interval);
  }, []);

  const calculateTimeLeft = (previousTimeLeft: TimeLeft): TimeLeft => {
    const totalSeconds = previousTimeLeft.totalSeconds - 1;

    return {
      totalSeconds,
      hours: Math.floor(totalSeconds / (60 * 60)),
      minutes: Math.floor(totalSeconds / 60),
      seconds: Math.floor(totalSeconds % 60),
    };
  };

  return {
    state,
    finishAttendance: () => {
      const duration = totalTime - timeLeft.totalSeconds;

      clearInterval(timeInterval);
      setDuration(duration);
      saveAttendance(attendance, duration);
    },
  };
};

export default useAttendance;
