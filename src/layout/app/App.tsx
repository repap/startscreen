import React, { useState } from 'react';
import './App.scss';
import Weather from '../../features/weather/components/Weather';

function App() {
  const [showComponent, setShowComponent] = useState(false);
  const toggleComponent = () => setShowComponent(!showComponent)
  return (
    <div className="App">
      <header className="App-header">
        <Weather city="bremen" country="de" />
        {showComponent && (
          <Weather city="munich" country="de" />
        )}
      </header>
      <button onClick={toggleComponent}>
        toggle
      </button>
    </div>
  );
}

export default App;
