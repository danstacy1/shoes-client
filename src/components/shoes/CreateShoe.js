import { useState } from 'react'

import ShoeForm from '../shared/ShoeForm'

const CreateShoe = (props) => {
    const [shoe, setShoe] = useState({
        brand: '',
        name: '',
        color: '',
        style: '',
        adoptable: false
    })

    const handleChange = (e) => {
        setShoe(prevShoe => {
            const updatedValue = e.target.value
            const updatedName = e.target.name
            const updatedShoe = {
                [updatedName]: updatedValue
            }
            return {
                ...prevShoe,
                ...updatedShoe
            }
        })
    }

    return <ShoeForm shoe={ shoe } handleChange={ handleChange } />
}

export default CreateShoe