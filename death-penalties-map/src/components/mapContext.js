import React, { useState } from 'react';
import sanity from '../lib/sanity';

const { Provider, Consumer } = React.createContext();

const MapContextProvider = ({ children }) => {
  const [id, setId] = useState(null);
  const [execution, setExecution] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const fetchExecutionData = id => {
    const query = `*[_id == "${id}"]{
            history,
            county,
            _updatedAt,
            prisoner,
            crime,
            date,
            executioner->{name, _id},
            method->{name},
            name,
          }`;
    sanity
      .fetch(query)
      .then(response => {
        setExecution(response[0]);
        setShowPopup(true);
      })
      .catch(e => console.log(e));
  };

  const closePopup = () => setShowPopup(false);

  return (
    <Provider
      value={{
        id,
        execution,
        fetchExecutionData,
        isPopupOpen: showPopup,
        closePopup
      }}
    >
      {children}
    </Provider>
  );
};

export { MapContextProvider, Consumer as MapContextConsumer };
