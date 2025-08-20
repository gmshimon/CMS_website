/* eslint-disable no-unused-vars */
import axios from "axios"; 

const prod = "http://so00gsss8g8ccggg44ccsowc.31.97.71.226.sslip.io/api/v1/"

const local = 'http://localhost:5000/api/v1/'

const instance = axios.create({
  baseURL : local,
});

export default instance;