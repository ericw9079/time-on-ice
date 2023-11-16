import { React, useReducer } from 'react';

import '../styles/Periods.css';

const Periods = ({ period, setPeriod }) => {
  const [periods, addPeriod] = useReducer((periods, action) => {
    const newPeriods = new Set(periods);
    newPeriods.add(action);
    return newPeriods;
  }, new Set(['1', '2', '3']));
  return (
    <div className="periods">
      <div className="period-box">
        {Array.from(periods).map((el, i) => (
          <button
            key={`period${i}`}
            onClick={() => setPeriod(el)}
            className={`period ${period === el ? 'active' : 'inactive'}`}
          >
            {parseInt(el, 10) > 3 ? `OT${parseInt(el, 10) - 3 > 1 ? ` ${parseInt(el, 10) - 3}` : ''}` : el}
          </button>
        ))}
      </div>
      <button
        onClick={() => {
          addPeriod(`${periods.size + 1}`);
        }}
        className="period newPeriod"
      >
        +
      </button>
    </div>
  );
};

Periods.defaultProps = {
  period: '1',
  setPeriod: () => { },
}

export default Periods;
