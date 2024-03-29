import React, { useEffect, useState } from 'react';
import { getAllServices } from '../requests/service';
import { Service } from '../types/service.type';
import { secondsToTimeString } from '../utils/time.utils';

import Form from 'react-bootstrap/Form';
import { numberToBRLString } from '../utils/currency.utils';

type ServicesProps = {
  onSelectionChange(arg0: Service[]): void;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const ServiceSelection = (props: ServicesProps) => {
  const [services, setServices] = useState([] as Service[]);
  const [selectedServices, setSelectedServices] = useState([] as Service[]);
  const onSelectionChange = props.onSelectionChange;

  useEffect(() => {
    getAllServices().then((serviceList) => {
      setServices(serviceList);
    });
  }, []);

  useEffect(() => {
    onSelectionChange(selectedServices);
  }, [selectedServices]);

  const selectionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    const id = parseInt(event.target.value);

    if (isChecked === true) {
      const selectedService = services.find((service) => service.id === id);
      setSelectedServices((prevState) => [...prevState, selectedService]);
      return;
    }

    const servicesFiltered = selectedServices.filter((service) => service.id !== id);
    setSelectedServices(servicesFiltered);
  };

  return (
    <div>
      {services.map((service, index) => {
        const price = numberToBRLString(service.price);
        return (
          <div key={index} className="p-4">
            <Form.Check
              inline
              id={`service-${service.id}`}
              type="checkbox"
              value={service.id}
              label={`Service ${service.id}`}
              onChange={(event) => selectionChange(event)}
            />
            <div>Price: {price}</div>
            <div>Time: {secondsToTimeString(service.time)}</div>
          </div>
        );
      })}
    </div>
  );
};

export default ServiceSelection;
