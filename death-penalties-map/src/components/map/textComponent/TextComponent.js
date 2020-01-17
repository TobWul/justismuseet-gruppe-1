import React, { useState, useEffect } from 'react';
import style from './TextComponent.module.scss';
import sanity from '../../../lib/sanity';
import BlockContent from '@sanity/block-content-to-react';
import serializers from '../../serializers';
import { MapContextConsumer } from '../../mapContext';
import { cn } from '../../../lib/helpers';

const TextComponent = ({ id }) => {
  const [executionData, setExecutionData] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  return (
    <MapContextConsumer>
      {context => {
        const { execution, isPopupOpen } = context;
        return (
          <div className={cn(style.popup, isPopupOpen ? style.show : '')}>
            {execution && (
              <>
                <header>
                  <p className={style.place}>
                    {execution.name} i {execution.county} — {execution.date}
                  </p>
                  <h1 className={style.prisoner}>
                    {execution.prisoner && execution.prisoner.name}
                  </h1>
                  <div className={style.info}>
                    <p>
                      <strong>Skarpetter:</strong>{' '}
                      {execution.executioner
                        ? execution.executioner.name
                        : 'Ukjent'}
                    </p>
                    <p>
                      <strong>Forbrytelse:</strong> {execution.crime}
                    </p>
                  </div>
                </header>
                <div className={style.story}>
                  {execution.history ? (
                    <BlockContent
                      blocks={execution.history}
                      serializers={serializers}
                    />
                  ) : (
                    <p>
                      <em>Ukjent historie.</em>
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        );
      }}
    </MapContextConsumer>
  );
};

export default TextComponent;
