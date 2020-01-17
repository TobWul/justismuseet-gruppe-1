import React from 'react';
import './styles/variables.scss';
import './styles/global.scss';
import Map from './components/map/Map';
import TextComponent from './components/map/textComponent/TextComponent';

function App() {
  return <div><Map />
  <TextComponent/>
  </div>;
}

export default App;
