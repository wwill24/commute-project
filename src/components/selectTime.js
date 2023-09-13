import React, { useState }from 'react'
import DropdownSelect from './dropdownSelect'
import './selectTime.css'

function SelectTime () {
  const [selectedValue, setSelectedValue] = useState('');

  const handleSelect = (value) => {
    setSelectedValue(value);
  };

  return (
    <div className='select-time'>
      <p>When should we inform you to leave?</p>
      <DropdownSelect
        options={['5 minutes before', '10 minutes before', '15 minutes before', '30 minutes before', '1 hour before']}
        onSelect={handleSelect}
      />
      <p>Selected option: {selectedValue}</p>
    </div>
  );
}

export default SelectTime
