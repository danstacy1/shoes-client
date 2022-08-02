import apiUrl from '../apiConfig'
import axios from 'axios'

export const getAllShoes = () => {
    return axios(`${apiUrl}/shoes`)
}

export const getOneShoe = (id) => {
    return axios(`${apiUrl}/shoes/${id}`)
}

export const createShoe = (user, newShoe) => {
    // console.log('createPet in api was hit')
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

export const updateShoe = (user, updatedShoe) => {
    // console.log('createPet in api was hit')
    // in our createpet form, we're building an object
    // when we pass that object into the api createPet function,
    // it's going to look like the pets in our database
    // we're going to refer to this as newPet
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