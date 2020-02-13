import axios from 'axios';

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const token = window.sessionStorage.token === null 
    || window.sessionStorage.token === undefined 
    || window.sessionStorage.token === '' ?
    '' : `Token ${window.sessionStorage.token}`;

const headers = {
    'Authorization': token
}

export const movieApiAxios = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
});

export const serverAxios = axios.create({
    baseURL: 'http://localhost:8000',
    headers: headers
});