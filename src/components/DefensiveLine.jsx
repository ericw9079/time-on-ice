import { React, useContext } from 'react';
import Timer from './Timer';
import IdContext from '../contexts/IdContext';

import '../styles/DefensiveLine.css';

/**
 * Defensive line component
 */
const DefensiveLine = ({ running, id }) => {
  const parentID = useContext(IdContext);
  return (
    <IdContext.Provider value={`${parentID ? `${parentID}-` : ''}defense${id}`}>
      <div className="defense">
        <Timer
          running={running}
          id="1"
        />
        <Timer
          running={running}
          id="2"
        />
      </div>
    </IdContext.Provider>
  )
};

DefensiveLine.defaultProps = {
  running: false,
};

export default DefensiveLine;
