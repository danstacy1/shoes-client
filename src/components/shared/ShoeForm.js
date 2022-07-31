import { 
    Form,
    Button, 
} from 'react-bootstrap'

const ShoeForm = (props) => {
    return (
        <Form>
            <Form.Label htmlFor="brand">Brand</Form.Label>
            <Form.Control
                placeholder="What brand is your shoe?"
                name="brand"
                id="brand"
            />
            <Form.Label htmlFor="name">Name</Form.Label>
            <Form.Control
                placeholder="Which shoe is it?"
                name="type"
                id="type"
            />
            <Form.Label htmlFor="color">Colorway</Form.Label>
            <Form.Control
                placeholder="Colorway"
                name="color"
                id="color"
            />
            <Form.Label htmlFor="style">Style</Form.Label>
            <Form.Control
                placeholder="Which style is your shoe"
                name="style"
                id="style"
            />
            <Form.Check
                label="Check box if these shoes are for sale?"
                name="forsale"
                defaultChecked={ false  }
            />
            <Button type="submit">Submit</Button>
        </Form>
    )
}

export default ShoeForm