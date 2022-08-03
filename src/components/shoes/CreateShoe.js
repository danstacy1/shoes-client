import { useState } from 'react'
import { createShoe } from '../../api/shoes'
import { useNavigate } from 'react-router-dom'
import { createShoeSuccess, createShoeFailure } from '../shared/AutoDismissAlert/messages'
import ShoeForm from '../shared/ShoeForm'

const CreateShoe = (props) => {
    // console.log('these are the props in createShoe\n', props)
    const { user, msgAlert } = props

    const navigate = useNavigate()

    const [shoe, setShoe] = useState({
        brand: '',
        name: '',
        color: '',
        style: '',
        forsale: false
    })

    console.log('this is the shoe in createShoe', shoe)


    const handleChange = (e) => {
        setShoe(prevShoe => {
            let updatedValue = e.target.value
            const updatedName = e.target.name
            console.log('this is the input type', e.target.type)

            // if (e.target.type === 'number') {
            //     // this is looking at the input type, and changing it from the default, which is a string, into an actual number
            //     updatedValue = parseInt(e.target.value)
            // }

            // this handles the checkbox, changing on to true etc
            if (updatedName === "forsale" && e.target.checked) {
                updatedValue = true
            } else if (updatedName === "forsale" && !e.target.checked) {
                updatedValue = false
            }


            const updatedShoe = {
                [updatedName]: updatedValue
            }
            return {
                ...prevShoe,
                ...updatedShoe
            }
        })
    }

    // Add handle submit here.
    const handleSubmit = (e) => {
        // e equals the event
        e.preventDefault()
        console.log('this is the user', user)
        console.log('this is the shoe', shoe)
        createShoe(user, shoe)
            // if we're successful, navigate to the show page for the new shoe
            .then(res => { navigate(`/shoes/${res.data.shoe.id}`)})
            // send a success message to the user
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: createShoeSuccess,
                    variant: 'success'
                })
            })
            // if there is an error, tell the user about it
            .catch(() => 
                msgAlert({
                    heading: 'Oh No!',
                    message: createShoeFailure,
                    variant: 'danger'
                })
            )
    }


    return (
        <ShoeForm 
            shoe={ shoe } 
            handleChange={ handleChange }
            handleSubmit={ handleSubmit }
            heading="Add a new shoe!"
        />
    )
}

export default CreateShoe