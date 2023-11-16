import { React, useContext } from 'react';
import ExportButton from './ExportButton';

import '../styles/Controls.css';

const Controls = ({ running, setRunning }) => {

  return (
    <div className="controls">
      <div>
        Timers are <span className={running ? 'running' : 'notRunning'}>
          {running ? 'running' : 'not running'}
        </span>
      </div>
      <button onClick={() => setRunning(!running)}>
        Face Off
      </button>
      <ExportButton
        disabled={running}
      />
    </div>
  );
};

Controls.defaultProps = {
  running: false,
  setRunning: () => { },
};

export default Controls;
