import React, { Component } from 'react'
import { API } from '../utils/http'
import './info.css'
import CheckDays from './checkDays'
import SelectTime from './selectTime'
import ArrivalTimeInput from './arrivalTime'

class Info extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: ''
      // user_phone_number: '',
      // home_address: '',
      // destination_address: '',
      // destination_name: '',
      // arrival_time: '',
      // days: ''
    }
  }

  async handleSubmit () {
    try {
      const {
        username
        // user_phone_number,
        // home_address,
        // destination_address,
        // destination_name,
        // arrival_time,
        // days
      } = this.state

      const payload = {
        username
        // user_phone_number,
        // home_address,
        // destination_address,
        // destination_name,
        // arrival_time,
        // days
      }

      const res = await API.post('/users', payload)
      console.log(res.data)
      window.alert('Thank you for submitting your info! You will receive a text message shortly.')
    } catch (err) {
      console.error(err.message)
      console.error(err.stack)
      window.alert('something went wrong, please reload and try again')
    }
  }

  render () {
    const {
      username
    } = this.state

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
          <form id='infoForm' onSubmit={() => this.handleSubmit()}>
            <label>First Name</label>
            <input
              type='text'
              name='user_name'
              required
              default={''}
              value={username || ''}
              onChange={(e) => {
                let val = e.target.value
                console.log({ val })
                if (val === '') e = null
                this.setState({ username: val })
              }}
            />
            {/* <label>Phone Number</label>
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
            <SelectTime className='time'/> */}
            <button className='btn' type='submit'>Submit</button>
          </form>
        </div>
      </div>
    )
  }

}

export default Info
