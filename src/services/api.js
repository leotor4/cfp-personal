import axios from 'axios';

const api = axios.create({
  // baseURL: 'https://vortex-hmg.unifor.br/cfp/back',
  baseURL: 'https://cfp-back.herokuapp.com',
  // baseURL: 'http://localhost:3333',
})

export default api;