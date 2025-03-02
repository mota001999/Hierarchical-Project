
import React from 'react';

const Table = ({ entry, fn, diff, parPercent }) => {
  const { value, id, label, children } = entry;
  const [curvalue, setValue] = React.useState(value);
  const [variance, setVariance] = React.useState(0);
  const [change, setChange] = React.useState(0);
  const [inputValue, setInputValue] = React.useState('');
  const [varCount, setVarCount] = React.useState(0);

  const handleChangeValue = () => {
    if (isNaN(inputValue)) return;
    const changeVal = Number(inputValue) - curvalue;
    if (fn) {
      fn(changeVal);
    }
    const varianceChange = (changeVal / curvalue) * 100;
    setVariance(variance + varianceChange);
    setChange(changeVal);
    setValue(Number(inputValue));
    setVarCount(varCount + 1);
    setTimeout(() => {
      setInputValue('');
    }, 2000);
  };

  const handleChangePercent = () => {
    if (isNaN(inputValue)) return;
    const changeVal = (Number(inputValue) / 100) * curvalue;
    if (fn) {
      fn(changeVal);
    }
    const varianceChange = Number(inputValue);
    setVariance(variance + varianceChange);
    setVarCount(varCount + 1);
    setChange(changeVal);
    setValue(curvalue + changeVal);
    setTimeout(() => {
      setInputValue('');
    }, 2000);
  };

  const handleChangeDiff = (changeInChild) => {
    const myVal = changeInChild + curvalue;
    const varianceChange = (changeInChild / curvalue) * 100;
    setValue(myVal);
    setVariance(variance + varianceChange);
    setVarCount(varCount + 1);
  };

  React.useEffect(() => {
    if(diff!==0){
    const myValue = diff/parPercent + curvalue;
    setValue(myValue);
    setVariance(variance + (myValue/curvalue) * 100);
    setVarCount(varCount + 1);}
  }, [diff]);

  return (
    <>
      <div
        key={id}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
          fontFamily: 'Arial, sans-serif',
          fontSize: '14px',
          backgroundColor: label.startsWith('--') ? '#1a1a1a' : '#121212',
          color: '#fff',
          gap:"20px"
        }}
      >
        <span style={{ flex: 2, paddingLeft: label.startsWith('--') ? '20px' : '0' }}>{label}</span>
        <span style={{ flex: 1, textAlign: 'center' }}>{curvalue}</span>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{
            flex: 1,
            background: '#252525',
            border: '1px solid #444',
            color: '#fff',
            padding: '5px',
            textAlign: 'center',
          }}
        />
        <button
          onClick={handleChangePercent}
          style={{
            flex: 1,
            background: '#333',
            border: 'none',
            color: '#fff',
            padding: '5px 10px',
            cursor: 'pointer',
          }}
        >
          [button1]
        </button>
        <button
          onClick={handleChangeValue}
          style={{
            flex: 1,
            background: '#444',
            border: 'none',
            color: '#fff',
            padding: '5px 10px',
            cursor: 'pointer',
          }}
        >
          [button2]
        </button>
        <span style={{ flex: 1, textAlign: 'center' }}>
          {variance} %
        </span>
      </div>
      {children?.map((child) => (
        <Table entry={child} fn={handleChangeDiff} diff={change} parPercent={child.value / curvalue} />
      ))}
    </>
  );
};

export default Table;
