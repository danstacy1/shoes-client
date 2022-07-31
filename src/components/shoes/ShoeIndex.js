import { useState,useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

import LoadingScreen from '../shared/LoadingScreen'
import { getAllShoes } from '../../api/shoes'
import messages from '../shared/AutoDismissAlert/messages'


// ShoesIndex should make a request to the api
// To get all shoes
// Then display them when it gets them

// style for our card container
const cardContainerStyle = {
display: 'flex',
flexFlow: 'row wrap',
justifyContent: 'center'
}

const ShoesIndex = (props) => {
const [shoes, setShoes] = useState(null)
const [error, setError] = useState(false)

const { msgAlert } = props

console.log('Props in ShoesIndex', props)

useEffect(() => {
    console.log(props)
    getAllShoes()
        .then(res => setShoes(res.data.shoes))
        .catch(err => {
            msgAlert({
                heading: 'Error Getting Shoes',
                message: messages.getShoesFailure,
                variant: 'danger',
            })
            setError(true)
        })    
    }, [])

    if (error) {
        return <p>Error!</p>
    }

    // If shoes haven't been loaded yet, show a loading message
    if (!shoes) {
        return <LoadingScreen />
    } else if (shoes.length === 0) {
        return <p>There aren't any shoes here. Better add some dope kicks.</p>
    }

    const shoeCards = shoes.map(shoe => (
        <Card style={{ width: '30%', margin: 5}} key={ shoe.id }>
            <Card.Header>{ shoe.fullTitle }</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={`/shoes/${shoe.id}`}>Check out the { shoe.name }s</Link>
                </Card.Text>
            </Card.Body>
        </Card>
    ))

    return (
        <div style={ cardContainerStyle }>
            { shoeCards }
        </div>
    )
}

export default ShoesIndex