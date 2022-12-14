import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import ShoelaceForm from '../shared/ShoelaceForm'
import { updateShoelace } from '../../api/shoelaces'


const EditShoelaceModal = (props) => {
    const { 
        user, shoe, show, handleClose, msgAlert, triggerRefresh
    } = props

    const [shoelace, setShoelace] = useState(props.shoelace)

    const handleChange = (e) => {
        setShoelace(prevShoelace => {
            let value = e.target.value
            const name = e.target.name

        //     // console.log('this is the input type', e.target.type)
        //     // this handles the checkbox, changing on to true etc
        //     if (name === "isSqueaky" && e.target.checked) {
        //         value = true
        //     } else if (name === "isSqueaky" && !e.target.checked) {
        //         value = false
        //     }

        //     const updatedShoelace = {
        //         [name]: value
        //     }
        //     return {
        //         ...prevShoelace,
        //         ...updatedShoelace
        //     }
        // 
        })
    }

    const handleSubmit = (e) => {
        // e equals the event
        e.preventDefault()

        updateShoelace(user, shoe._id, shoelace)
            // if we're successful in the modal, we want the modal to close
            .then(() => handleClose())
            // send a success message to the user
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: 'Great! The shoelace is better than ever!',
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => 
                msgAlert({
                    heading: 'Hold up son!',
                    message: 'Something went wrong, please try again',
                    variant: 'danger'
                })
            )
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <ShoelaceForm 
                    shoelace={shoelace}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Update this shoelace!"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditShoelaceModal