import React, { useState } from 'react';
import ServiceSelection from './ServiceSelection';
import { Service } from '../types/service.type';
import { createAttendance } from '../requests/attendance';
import { numberToBRLString } from '../utils/currency.utils';

import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const CreateAttendance = () => {
  const [finalPrice, setFinalPrice] = useState(0);
  const [servicesIds, setServicesIds] = useState([] as number[]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');

  const serviceSelectionChange = (services: Service[]) => {
    const ids = services.map((service) => service.id);
    const priceSum = services.reduce((prev, service) => prev + service.price, 0);

    setServicesIds(ids);
    setFinalPrice(priceSum);
  };

  const createNewAttendance = () => {
    createAttendance(servicesIds)
      .then((attendance) => {
        setMessageType('success');
        setMessage(
          `Attendance ${attendance.id} created successfully. Wait for a professional to start it`,
        );
      })
      .catch((errorMessage) => {
        setMessageType('danger');
        setMessage(errorMessage);
      });
  };

  return (
    <Card>
      <Alert variant={messageType} hidden={message === ''}>
        {message}
      </Alert>

      <Card.Body>
        <h4>Create new attendance</h4>

        <div>
          <ServiceSelection onSelectionChange={serviceSelectionChange} />
        </div>

        <div>Total: {numberToBRLString(finalPrice)}</div>

        <Button onClick={createNewAttendance}>Create</Button>
      </Card.Body>
    </Card>
  );
};

export default CreateAttendance;
