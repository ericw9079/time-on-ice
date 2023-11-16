import { React, useState, useEffect, useContext } from 'react';
import useTimer from 'easytimer-react-hook';
import IdContext from '../contexts/IdContext';
import DataContext from '../contexts/DataContext';

import '../styles/Timer.css';

/**
 * Timer component
 */
const Timer = ({ running, id }) => {
  const [timer] = useTimer({ precision: 'secondTenths' });
  const [name, setName] = useState('');
  const [selected, setSelected] = useState(false);
  const parentID = useContext(IdContext);
  const currentID = `${parentID ? `${parentID}-` : ''}${id}`;
  const { timers, updateTimers } = useContext(DataContext);

  const formatTimeValues = (timeValues) => {
    let format = ['minutes', 'seconds'];
    if (timeValues.days > 0) {
      format = ['days', 'hours', 'minutes', 'seconds'];
    }
    else if (timeValues.hours > 0) {
      format = ['hours', 'minutes', 'seconds'];
    }
    return timeValues.toString(format);
  }

  useEffect(() => {
    timer.stop();
    if (timers[currentID]?.values) {
      timer.start({ startValues: timers[currentID].values });
      if (!running || !selected) {
        timer.pause();
      }
    }
    else {
      timer.start();
      if (!running || !selected) {
        timer.pause();
      }
    }
    updateTimers({ id: currentID, payload: { name: name, timer: '0:00'} });
  }, [currentID]);

  useEffect(() => {
    const timeValues = { ...timer.getTimeValues() };
    updateTimers({ id: currentID, payload: { name: name, timer: formatTimeValues(timer.getTimeValues()), values: timeValues } });
  }, [formatTimeValues(timer.getTimeValues()), name]);

  useEffect(() => {
    if (running && selected) {
      timer.start();
    }
    else {
      timer.pause();
    }
  }, [running, selected]);

  return (
    <div className="timer">
      <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
      <button
        onClick={() => setSelected(!selected)}
        className={selected ? 'selected' : 'notSelected'}
      >
        {formatTimeValues(timer.getTimeValues())}
      </button>
    </div>
  );
};

Timer.defaultProps = {
  running: false,
};

export default Timer;
