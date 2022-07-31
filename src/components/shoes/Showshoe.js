import { useState, useEffect } from 'react'

import { useParams, useNavigate } from 'react-router-dom'
// this will allow us to see our parameters

import { Container, Card } from 'react-bootstrap'

import LoadingScreen from '../shared/LoadingScreen'
import { getOneShoe } from '../../api/shoes'
import messages from '../shared/AutoDismissAlert/messages'

// We need to get the shoe's id from the parameters
// Then we need to make a request to the api
// Then we need to display the results in this component

const ShowShoe = (props) => {
    const [shoe, setShoe] = useState(null)

    const { id } = useParams()
    const navigate = useNavigate()
    // useNavigate returns a function
    // we can call that function to redirect the user wherever we want to

    const { msgAlert } = props
    // destructuring to get the id value from our route parameters
    useEffect(() => {
        getOneShoe(id)
            .then(res => setShoe(res.data.shoe))
            .catch(err => {                   
                msgAlert({
                    heading: 'Error getting shoe',
                    message: messages.getShoesFailure,
                    variant: 'danger'
                })
                navigate('/')
                //navigate back to the home page if there's an error fetching
            })
    }, [])

    if (!shoe) {
        return <LoadingScreen />
    }

    return (
        <Container className="fluid">
            <Card>
                <Card.Header>{ shoe.fullTitle }</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <div><small>Brand: { shoe.brand }</small></div>
                        <div><small>Name: { shoe.name }</small></div>
                        <div><small>Color: { shoe.color }</small></div>
                        <div><small>Style: { shoe.style }</small></div>
                        <div><small>
                            For Sale: { shoe.forsale ? 'yes' : 'no'}
                        </small></div>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default ShowShoe