import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import ShoeForm from '../shared/ShoeForm'
import { updateShoeSuccess, updateShoeFailure } from '../shared/AutoDismissAlert/messages'

const EditShoeModal = (props) => {
    const { 
        user, show, handleClose, 
        updateShoe, msgAlert, triggerRefresh
    } = props

    const [shoe, setShoe] = useState(props.shoe)

    console.log('shoe in edit modal', shoe)

    const handleChange = (e) => {
        setShoe(prevShoe => {
            let updatedValue = e.target.value
            const updatedName = e.target.name

            console.log('this is the input type', e.target.type)

            if (e.target.type === 'number') {
                // this is looking at the input type, and changing it from the default, which is a string, into an actual number
                updatedValue = parseInt(e.target.value)
            }

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

    const handleSubmit = (e) => {
        // e equals the event
        e.preventDefault()

        updateShoe(user, shoe)
            // if we're successful in the modal, we want the modal to close
            .then(() => handleClose())
            // send a success message to the user
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: updateShoeSuccess,
                    variant: 'success'
                })
            })
            // if everything is successful, we need to trigger our refresh for the show page
            // this is that setUpdated function in showShoe component
            // updated is in ShowShoe's useEffect's dependency array
            // changes to the updated boolean cause ShowShoe's useEffect to run again.
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => 
                msgAlert({
                    heading: 'Oh No!',
                    message: updateShoeFailure,
                    variant: 'danger'
                })
            )
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <ShoeForm 
                    shoe={shoe}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Update Shoe"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditShoeModal