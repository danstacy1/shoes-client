import { useState, useEffect } from 'react'

import { useParams, useNavigate } from 'react-router-dom'
// this will allow us to see our parameters

import { Container, Card, Button } from 'react-bootstrap'

import LoadingScreen from '../shared/LoadingScreen'
import { getOneShoe, updateShoe, removeShoe } from '../../api/shoes'
import messages from '../shared/AutoDismissAlert/messages'
import EditShoeModal from './EditShoeModal'
import NewShoelaceModal from '../shoelaces/NewShoelaceModal'
import ShowShoelace from '../shoelaces/ShowShoelace'

// We need to get the shoe's id from the parameters
// Then we need to make a request to the api
// Then we need to display the results in this component

const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const ShowShoe = (props) => {
    const [shoe, setShoe] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [shoelaceModalShow, setShoelaceModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()
    // useNavigate returns a function
    // we can call that function to redirect the user wherever we want to

    const { user, msgAlert } = props
    console.log('user in props', user)
    console.log('the shoe in showShoe', shoe)
    // destructuring to get the id value from our route parameters
    useEffect(() => {
        getOneShoe(id)
            .then(res => setShoe(res.data.shoe))
            .catch(err => {                   
                msgAlert({
                    heading: 'Error getting shoe',
                    message: messages.getShoeFailure,
                    variant: 'danger'
                })
                navigate('/')
                //navigate back to the home page if there's an error fetching
            })
    }, [updated])

    // here we'll declare a function that runs which will remove the shoe
    // this function's promise chain should send a message, and then go somewhere
    const removeTheShoe = () => {
        removeShoe(user, shoe.id)
            // on success send a success message
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.removeShoeSuccess,
                    variant: 'success'
                })
            })
            // then navigate to index
            .then(() => {navigate('/')})
            // on failure send a failure message
            .catch(err => {                   
                msgAlert({
                    heading: 'Error removing shoe',
                    message: messages.removeShoeFailure,
                    variant: 'danger'
                })
            })
    }

    let shoelaceCards
    if (shoe) {
        if (shoe.shoelaces.length > 0) {
            shoelaceCards = shoe.shoelaces.map(shoelace => (
                <ShowShoelace 
                    key={shoelace._id}
                    shoelace={shoelace}
                    shoe={shoe}
                    user={user}
                    msgAlert={msgAlert}
                    triggerRefresh={() => setUpdated(prev => !prev)}
                />
            ))
        }
    }


    if (!shoe) {
        return <LoadingScreen />
    }

    return (
        <>
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
                    <Card.Footer>
                        {
                            shoe.owner && user && shoe.owner._id === user._id 
                            ?
                            <>
                                <Button onClick={() => setShoelaceModalShow(true)}
                                    className="m-2" variant="info"
                                >
                                    Give your {shoe.name} some shoelaces!
                                </Button>
                                <Button onClick={() => setEditModalShow(true)} 
                                    className="m-2" 
                                    variant="warning"
                                >
                                    Edit Shoe
                                </Button>
                                <Button onClick={() => removeTheShoe()}
                                    className="m-2"
                                    variant="danger"
                                >
                                    Delete {shoe.name}
                                </Button>
                            </>

                            :
                            null
                        }
                    </Card.Footer>
                </Card>
            </Container>
            <Container style={cardContainerLayout}>
                {shoelaceCards}
            </Container>
            <EditShoeModal 
                user={user}
                shoe={shoe} 
                show={editModalShow} 
                updateShoe={updateShoe}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setEditModalShow(false)} 
            />
            <NewShoelaceModal 
                shoe={shoe}
                show={shoelaceModalShow}
                user={user}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setShoelaceModalShow(false)} 
            />
        </>
    )
}

export default ShowShoe