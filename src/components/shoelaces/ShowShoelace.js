import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import EditShoelaceModal from './EditShoelaceModal'
import { deleteShoelace } from '../../api/shoelaces'

const ShowShoelace = (props) => {
    // destructure some props
    const { shoelace, shoe, user, msgAlert, triggerRefresh } = props

    // here's where we'll put a hook to open the edit shoelace modal when we get there
    const [editModalShow, setEditModalShow] = useState(false)

    // this will set a color depending on the shoelace's condition
    // const setBgCondition = (cond) => {
    //     if (cond === 'new') {
    //         return({width: '18rem', backgroundColor:'#b5ead7'})
    //     } else if (cond === 'used') {
    //         return({width: '18rem', backgroundColor:'#ffdac1'})
    //     } else {
    //         return({width: '18rem', backgroundColor:'#ff9aa2'})
    //     }
    // }

    // calls this to destroy a shoelace
    const destroyShoelace = () => {
        deleteShoelace(user, shoe._id, shoelace._id)
            .then(() => 
                msgAlert({
                    heading: 'Shoelace Deleted',
                    message: 'Good luck keeping your shoes on your feet BUM!!!!!',
                    variant: 'success'
                }))
            .then(() => triggerRefresh())
            .catch(() => 
                msgAlert({
                    heading: 'Hold up!',
                    message: 'Something went wrong!',
                    variant: 'danger'
                }))
    }

    return (
        <>
            <Card className="m-2">
                <Card.Header>{shoelace.color}</Card.Header>
                <Card.Body>
                    <small>Here are your {shoelace.color} shoelaces.</small><br/>
                </Card.Body>
                    {
                        user && user._id === shoe.owner._id
                        ?
                        <>
                           <Button 
                                variant="warning"
                                onClick={() => setEditModalShow(true)}
                            >
                                Edit Shoelaces
                            </Button>
                            <Button 
                                onClick={() => destroyShoelace()} 
                                variant="danger"
                            >
                                Delete Shoelaces
                            </Button>
                        </>
                        :
                        null
                    }
            </Card>
            <EditShoelaceModal
                user={user}
                shoe={shoe}
                shoelace={shoelace}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={triggerRefresh}
            />
        </>
    )
}
export default ShowShoelace