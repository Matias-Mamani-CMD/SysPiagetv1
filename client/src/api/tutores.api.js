import axios from 'axios';

const tutoresApi = axios.create({
    baseURL: "http://127.0.0.1:8000/api/tutores/"
})

export const getAllTutores = () => tutoresApi.get()

export const createTutores = (tutor) => tutoresApi.post("",tutor)