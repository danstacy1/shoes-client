import { 
    Form,
    Button, 
} from 'react-bootstrap'

const PetForm = (props) => {
    return (
        <Form>
            <Form.Label htmlFor="name">Name</Form.Label>
            <Form.Control
                placeholder="What is your pet's name?"
                name="name"
                id="name"
            />
            <Form.Label htmlFor="type">Type</Form.Label>
            <Form.Control
                placeholder="What kind of pet is this?"
                name="type"
                id="type"
            />
            <Form.Label htmlFor="age">Age</Form.Label>
            <Form.Control
                placeholder="How old is your pet?"
                type="number"
                name="age"
                id="age"
            />
            <Form.Check
                label="Is this pet adoptable?"
                name="adoptable"
                defaultChecked={ false  }
            />
            <Button type="submit">Submit</Button>
        </Form>
    )
}

export default PetForm