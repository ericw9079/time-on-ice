import { React, useContext } from 'react';
import Timer from './Timer';
import IdContext from '../contexts/IdContext';

import '../styles/ForwardLine.css';

/**
 * Forward line component
 */
const ForwardLine = ({
  running = false,
  id,
}) => {
  const parentID = useContext(IdContext);
  return (
    <IdContext.Provider value={`${parentID ? `${parentID}-` : ''}forward${id}`}>
      <div className="forward">
        <Timer
          running={running}
          id="1"
        />
        <Timer
          running={running}
          id="2"
        />
        <Timer
          running={running}
          id="3"
        />
      </div>
    </IdContext.Provider>
  );
};

export default ForwardLine;
