import React, { useState, useEffect } from 'react';
import style from './TextComponent.module.scss';
import sanity from '../../../lib/sanity';
import BlockContent from '@sanity/block-content-to-react';
import serializers from '../../serializers';

const TextComponent = ({ id }) => {
  const [executionData, setExecutionData] = useState(null);
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
        setExecutionData(response[0] !== null ? response[0] : null);
        executionData ? setShowPopup(true) : setShowPopup(false);
        console.log(executionData);
      })
      .catch(e => console.log(e));
  };

  useEffect(() => {
    fetchExecutionData(id);
  }, [id]);
  //   const hasHistory = his => {
  //     return his == '';
  //   };
  //   let text;
  //   let img;
  //   const getText = his => {
  //     text =
  //       data.history.children.text == ''
  //         ? 'Ukjent historie'
  //         : data.history.children.text;
  //     img = data.history.asset._ref == '' ? '' : data.history.asset._ref;
  //   };
  return showPopup ? (
    <div className={style.popup}>
      <header>
        <p id="placement">
          {executionData.name}
          {executionData.county}
        </p>
        <h1 id="name">
          {executionData.prisoner && executionData.prisoner.name}
        </h1>
        <p>
          Skarpetter:{' '}
          {executionData.executioner && executionData.executioner.name}
        </p>
        <p>Forbrytelse: {executionData.crime}</p>
      </header>
      <div id="information">
        {executionData.history && (
          <BlockContent
            blocks={executionData.history}
            serializers={serializers}
          />
        )}
      </div>
    </div>
  ) : (
    ''
  );
};

export default TextComponent;
