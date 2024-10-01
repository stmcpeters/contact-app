import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import * as ioicons from 'react-icons/io5'

const Contact = ({contact, toUpdate, toDelete, toggleDetailsVisibility}) => {

    const onUpdate = (toUpdateContact) => {
        toUpdate(toUpdateContact)
    }

    const onDelete = (toDeleteContact) => {
        toDelete(toDeleteContact)
    }


    return (
        <Card>
            <Card.Body>
            <Card.Title>{contact.name}</Card.Title>
            <Button 
                variant="outline-danger" 
                onClick={()=>{onDelete(contact)}} 
                style={{padding: '0.6em', marginRight:'0.9em'}}><ioicons.IoTrash/></Button>
            <Button 
                variant="outline-info" 
                onClick={()=>{onUpdate(student)}} 
                style={{padding: '0.6em'}}> <ioicons.IoSync/></Button>
            <button 
                onClick={()=>{toggleDetailsVisibility(contact.id)}}
                style={{padding: '0.6em', marginLeft:'0.9em'}}>Show Details</button>
            </Card.Body>
        </Card>
    )

}

export default Contact;