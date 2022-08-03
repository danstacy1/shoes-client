import apiUrl from '../apiConfig'
import axios from 'axios'

// CREATE
export const createShoelace = (user, shoeId, newShoelace) => {
    console.log('the user in createShoelace', user)
    console.log('the newShoelace in createShoelace', newShoelace)
	return axios({
		url: `${apiUrl}/shoelaces/${shoeId}`,
		method: 'POST',
		data: { shoelace: newShoelace }
	})
}

// UPDATE Shoelace
export const updateShoelace = (user, shoeId, updatedShoelace) => {
    console.log('this is updatedShoelace', updatedShoelace)
	return axios({
		url: `${apiUrl}/shoelaces/${shoeId}/${updatedShoelace._id}`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { shoelace: updatedShoelace }
	})
}

// DELETE Shoelace
export const deleteShoelace = (user, shoeId, shoelaceId) => {
	return axios({
		url: `${apiUrl}/shoelaces/${shoeId}/${shoelaceId}`,
		method: 'DELETE',
		headers: {
			Authorization: `Token token=${user.token}`,
		}
	})
} 