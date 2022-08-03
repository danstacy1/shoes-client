import React, { useState } from 'react'
import { Form, Container, Button } from 'react-bootstrap'

const ShoelaceForm = (props) => {
    const {shoelace, handleChange, handleSubmit, heading} = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Label htmlFor="color">Color</Form.Label>
                <Form.Control
                    placeholder="What color are the shoelaces?"
                    name="color"
                    id="color"
                    value={ shoelace.color }
                    onChange={ handleChange }
                />
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default ShoelaceForm


