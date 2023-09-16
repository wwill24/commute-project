import React, { useState } from 'react'

function CheckDays () {
  const [daysOfWeek, setDaysOfWeek] = useState({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  });

  const handleCheckboxChange = (day) => {
    setDaysOfWeek((prevDays) => ({
      ...prevDays,
      [day]: !prevDays[day],
    }));
  };

  return (
    <div style={{ marginLeft: '0', paddingLeft: '0'}}>
      <ul style={{ listStyle: 'none', marginLeft: '0', paddingLeft: '0' }}>
        <p>Which days of the week will you commute?</p>
        {Object.keys(daysOfWeek).map((day) => (
          <li key={day}>
            <label>
              <input
                type="checkbox"
                checked={daysOfWeek[day]}
                onChange={() => handleCheckboxChange(day)}
              />
              {day}
            </label>
          </li>
        ))}
      </ul>
      <p>Selected days: {Object.keys(daysOfWeek).filter((day) => daysOfWeek[day]).join(', ')}</p>
    </div>
  )
}

export default CheckDays
