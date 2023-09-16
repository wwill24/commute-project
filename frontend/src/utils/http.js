import axios from 'axios'

const headers = {
  'Content-Type': 'application/json'
}

export const API = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '<some url for prod>' : 'http://localhost:5001',
  headers
})

