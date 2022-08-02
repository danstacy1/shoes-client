import { 
    Form,
    Button, 
    Container
} from 'react-bootstrap'

const ShoeForm = (props) => {
    const { shoe, handleChange, heading, handleSubmit } = props 
    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}></Form>
            <Form>
                <Form.Label htmlFor="brand">Brand</Form.Label>
                <Form.Control
                    placeholder="What brand is your shoe?"
                    name="brand"
                    id="brand"
                    value={ shoe.brand }
                    onChange={ handleChange }
                    />
                <Form.Label htmlFor="name">Name</Form.Label>
                <Form.Control
                    placeholder="Which shoe is it?"
                    name="type"
                    id="type"
                    value={ shoe.name }
                    onChange={ handleChange }
                    />
                <Form.Label htmlFor="color">Colorway</Form.Label>
                <Form.Control
                    placeholder="Colorway"
                    name="color"
                    id="color"
                    value={ shoe.color }
                    onChange={ handleChange }
                    />
                <Form.Label htmlFor="style">Style</Form.Label>
                <Form.Control
                    placeholder="Which style is your shoe"
                    name="style"
                    id="style"
                    value={ shoe.style }
                    onChange={ handleChange }
                    />
                <Form.Check
                    label="Check box if these shoes are for sale?"
                    name="forsale"
                    defaultChecked={ shoe.forsale  }
                    onChange= { handleChange }
                    />
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default ShoeForm