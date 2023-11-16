import { React, useContext } from 'react';
import Timer from './Timer';
import IdContext from '../contexts/IdContext';

import '../styles/Goalie.css';

/**
 * Goalie component
 */
const Goalie = ({ running, id }) => {
  const parentID = useContext(IdContext);
  return (
    <IdContext.Provider value={`${parentID ? `${parentID}-` : ''}golie${id}`}>
      <div className="goalie">
        <Timer
          running={running}
          id="1"
        />
      </div>
    </IdContext.Provider>
  )
};

Goalie.defaultProps = {
  running: false,
};

export default Goalie;
