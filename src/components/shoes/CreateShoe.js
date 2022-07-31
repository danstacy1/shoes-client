import { useState } from 'react'

import PetForm from '../shared/PetForm'

const CreatePet = (props) => {
    const [pet, setPet] = useState({
        name: '',
        type: '',
        age: '',
        adoptable: false
    })

    const handleChange = (e) => {
        setPet(prevPet => {
            const updatedValue = e.target.value
            const updatedName = e.target.name
            const updatedPet = {
                [updatedName]: updatedValue
            }
            return {
                ...prevPet,
                ...updatedPet
            }
        })
    }

    return <PetForm pet={ pet } handleChange={ handleChange } />
}

export default CreatePet