import { createContext } from 'react';

const DataContext = createContext({
  timers: {},
  updateTimers: () => { }
});

export default DataContext;