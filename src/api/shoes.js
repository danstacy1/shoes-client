import apiUrl from '../apiConfig'
import axios from 'axios'

// READ => INDEX
export const getAllShoes = () => {
    return axios(`${apiUrl}/shoes`)
}

// READ => SHOW
export const getOneShoe = (id) => {
    return axios(`${apiUrl}/shoes/${id}`)
}

// CREATE
export const createShoe = (user, newShoe) => {
    // console.log('createShoe in api was hit')
    // console.log('this is user', user)
    // console.log('this is newShoe', newShoe)
    return axios({
		url: apiUrl + '/shoes',
		method: 'POST',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { shoe:  newShoe },
	})
}

// UPDATE
export const updateShoe = (user, updatedShoe) => {
    // console.log('createShoe in api was hit')
    // in our createshoe form, we're building an object
    // when we pass that object into the api createShoe function,
    // it's going to look like the shoes in our database
    // we're going to refer to this as newShoe
    // console.log('this is user', user)
    console.log('this is updatedShoe', updatedShoe)
	return axios({
		url: `${apiUrl}/shoes/${updatedShoe.id}`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { shoe: updatedShoe }
	})
} 

// DELETE
export const removeShoe = (user, shoeId) => {
    return axios({
        url: `${apiUrl}/shoes/${shoeId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`,
        }
    })
}