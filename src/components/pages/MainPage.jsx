import { React, useState, useReducer } from 'react';
import Controls from '../Controls';
import Periods from '../Periods';
import Team from '../Team';
import DataContext from '../../contexts/DataContext';
import IdContext from '../../contexts/IdContext';

import '../../styles/pages/MainPage.css';

const MainPage = () => {
  const [running, setRunning] = useState(false);
  const [period, setPeriod] = useState('1');

  const timerReducer = (timers, action) => {
    const newTimers = { ...timers };
    newTimers[action.id] = action.payload;
    return newTimers;
  };
  const [timers, updateTimers] = useReducer(timerReducer, {});

  const value = { timers, updateTimers };

  return (
    <DataContext.Provider value={value}>
      <div className="controls-block">
        <Controls running={running} setRunning={setRunning} />
        <Periods period={period} setPeriod={setPeriod} />
      </div>
      <div className="teams">
        <IdContext.Provider value={`period${period}`}>
          <Team running={running} id="1" />
          <Team running={running} id="2" />
        </IdContext.Provider>
      </div>
    </DataContext.Provider >
  );
};

export default MainPage;
