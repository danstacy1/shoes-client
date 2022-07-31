import apiUrl from '../apiConfig'
import axios from 'axios'

export const getAllShoes = () => {
    return axios(`${apiUrl}/shoes`)
}

export const getOneShoe = (id) => {
    return axios(`${apiUrl}/shoes/${id}`)
}