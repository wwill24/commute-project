import React from 'react'

import './info.css'
import CheckDays from './checkDays'
import SelectTime from './selectTime'
import ArrivalTimeInput from './arrivalTime'

const Info = () => {
  const sendToServer = (event) => {
    event.preventDefault();

    const formElement = document.getElementById("infoForm");
    const formData = new FormData(formElement);
    const payload = new URLSearchParams(formData);

    fetch("/formSubmit", {
      method: "POST",
      body: payload
    })
  }

  return (
    <div className='home-page'>
      {/* <div className='photo'>
        <img className='img' src={BackgroundImg} alt = 'BackgroundImg' />
      </div> */}
      <div className='description'>
        <h1>
          Commute2Day
        </h1>
        <p>
          This sends you a text message of traffic updates and recommended departure time for places of frequent visits, such as work, school, and appointments.
          The text message will give you a recommended departure time so you will never be late! Please fill out your info below to receive updates.
        </p>
      </div>
      <div className='form'>
        <form id='infoForm' onSubmit={sendToServer}>
          <label>First Name</label>
          <input type='text' name='user_name' required></input>
          <label>Phone Number</label>
          <input type='text' name='user_phone_number' required></input>
          <label>Home Address</label>
          <input type='text' name='home_address' required></input>
          <label>Destination Address</label>
          <input type='text' name='destination_address' required></input>
          <label>Destination Name</label>
          <input type='text' name='destination_name' required></input>
          <label>When do you need to arrive?</label>
          <ArrivalTimeInput/>
          <CheckDays/>
          <SelectTime className='time'/>
          <button className='btn'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Info
