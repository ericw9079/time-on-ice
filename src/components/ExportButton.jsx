import { React, useContext } from 'react';
import { formatISO } from 'date-fns';
import { utils, writeFileXLSX } from 'xlsx';
import DataContext from '../contexts/DataContext';

const ExportButton = (props) => {
  const { timers } = useContext(DataContext);
  const dataExport = () => {
    // Clone the data for export
    const timerData = JSON.parse(JSON.stringify(timers));
    const order = Object.keys(timerData);
    const periodRegex = /period(\d*)-?/i;
    // Sort the data
    order.sort((a, b) => {
      // First sort based on position
      if (a.replace(periodRegex, '') > b.replace(periodRegex, '')) {
        return 1;
      }
      if (a.replace(periodRegex, '') < b.replace(periodRegex, '')) {
        return -1;
      }
      // Then sort based on period
      if (a.match(periodRegex)[0] > b.match(periodRegex)[0].replace(' ', '')) {
        return 1;
      }
      if (a.match(periodRegex)[0] < b.match(periodRegex)[0].replace(' ', '')) {
        return -1;
      }
      return 0;
    });
    // Group the data by position
    const periods = new Set();
    let data = [];
    let positionData = [];
    let positionId = -1;
    order.forEach((position) => {
      periods.add(position.match(periodRegex)[1]);
      if (positionId !== position.replace(periodRegex, '')) {
        if (positionData.length > 0) {
          positionData.push(positionData.slice(1).reduce((previousValue, currentValue) => previousValue + currentValue));
          data.push(positionData);
        }
        positionData = [timerData[position].name];
        positionId = position.replace(periodRegex, '')
      }
      positionData.push(timerData[position].timer);
    });
    if (positionData.length > 0) {
      positionData.push(positionData.slice(1).reduce((previousValue, currentValue) => previousValue + currentValue));
      data.push(positionData);
    }
    const periodData = Array.from(periods).map((el => parseInt(el, 10) > 3 ? `OT${parseInt(el, 10) - 3 > 1 ? ` ${parseInt(el, 10) - 3}` : ''}` : el));
    periodData.unshift('Period:');
    periodData.push('Total:');
    data.unshift(periodData);

    // Generate XLSX
    const wb = utils.book_new();
    const ws = utils.aoa_to_sheet(data);
    utils.book_append_sheet(wb, ws);

    // Save XLSX
    const fileName = `${formatISO(new Date()).substring(0, 10)}.xlsx`;
    writeFileXLSX(wb, fileName);
  };

  return (
    <button
      {...props}
      onClick={() => dataExport()}
    >
      Export
    </button>
  )
};

export default ExportButton
