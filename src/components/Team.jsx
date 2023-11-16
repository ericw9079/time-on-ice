import { React, useContext, useState, useEffect } from 'react';
import ForwardLine from './ForwardLine';
import DefensiveLine from './DefensiveLine';
import Goalie from './Goalie';
import IdContext from '../contexts/IdContext';
import DataContext from '../contexts/DataContext';

import '../styles/Team.css';

/**
 * Team Component
 */
const Team = ({ running, id }) => {
  const parentID = useContext(IdContext);
  const { updateTimers } = useContext(DataContext);
  const [teamName, setTeamName] = useState('');

  const currentID = `${parentID ? `${parentID}-` : ''}team${id}`;

  useEffect(() => {
    updateTimers({ id: currentID, payload: { name: teamName || `Team ${id}` } });
  }, [teamName]);

  return (
    <IdContext.Provider value={currentID}>
      <div className="team">
        <div className="teamName">
          <input
            type="text"
            value={teamName}
            placeholder={`Team ${id}`}
            onChange={(e) => setTeamName(e.target.value)}
          />
        </div>
        <div>
          <ForwardLine
            running={running}
            id="1"
          />
          <ForwardLine
            running={running}
            id="2"
          />
          <ForwardLine
            running={running}
            id="3"
          />
          <ForwardLine
            running={running}
            id="4"
          />
          <ForwardLine
            running={running}
            id="5"
          />
        </div>
        <div>
          <DefensiveLine
            running={running}
            id="1"
          />
          <DefensiveLine
            running={running}
            id="2"
          />
          <DefensiveLine
            running={running}
            id="3"
          />
          <DefensiveLine
            running={running}
            id="4"
          />
        </div>
        <div>
          <Goalie
            running={running}
            id="1"
          />
          <Goalie
            running={running}
            id="2"
          />
        </div>
      </div>
    </IdContext.Provider>
  );
};

Team.defaultProp = {
  running: false,
};

export default Team;
