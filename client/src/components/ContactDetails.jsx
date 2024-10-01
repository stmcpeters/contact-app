import React from 'react';
import Card from 'react-bootstrap/Card';

const ContactDetails = ({ contact }) => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>Contact Details</Card.Title>
                  <ul>
                    <li>Name: {contact.name}</li>
                    <li>Phone Number: {contact.phone_number}</li>
                    <li>Email: {contact.email}</li>
                    <li>Birthday: {contact.birthday.split('T')[0]}</li>
                  </ul>
            </Card.Body>
        </Card>
    )
}

export default ContactDetails