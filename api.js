import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8000/api'
})


// INTERCEPTORS! → request → Enviar info al back
//               → response → Recibir info del back
API.interceptors.request.use((config) => {
    const jwt = localStorage.getItem("auth") ?? ""
    config.headers["Authorization"] = jwt;
    return config;
})


API.interceptors.response.use((response) => response, (err) => {
  if(err.response.status === 401){
    localStorage.removeItem("auth");
    window.location.href = "/login";
    return;
  }
});
