import { useState, useEffect } from 'react'

import { useParams, useNavigate } from 'react-router-dom'
// this will allow us to see our parameters

import { 
    Container,
    Card 
} from 'react-bootstrap'

import LoadingScreen from '../shared/LoadingScreen'
import { getOnePet } from '../../api/pets'
import messages from '../shared/AutoDismissAlert/messages'

// We need to get the pet's id from the parameters
// Then we need to make a request to the api
// Then we need to display the results in this component

const ShowPet = (props) => {
    const [pet, setPet] = useState(null)

    const { id } = useParams()
    const navigate = useNavigate()
    // useNavigate returns a function
    // we can call that function to redirect the user wherever we want to

    const { msgAlert } = props
    // destructuring to get the id value from our route parameters
    useEffect(() => {
        getOnePet(id)
            .then(res => setPet(res.data.pet))
            .catch(err => {                   
                msgAlert({
                    heading: 'Error getting pet',
                    message: messages.getPetsFailure,
                    variant: 'danger'
                })
                navigate('/')
                //navigate back to the home page if there's an error fetching
            })
    }, [])

    if (!pet) {
        return <LoadingScreen />
    }

    return (
        <Container className="fluid">
            <Card>
                <Card.Header>{ pet.fullTitle }</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <div><small>Age: { pet.age }</small></div>
                        <div><small>Type: { pet.type }</small></div>
                        <div><small>
                            Adoptable: { pet.adoptable ? 'yes' : 'no'}
                        </small></div>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default ShowPet