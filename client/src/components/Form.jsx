import React, { useState, useEffect } from 'react'
import { Button, Form } from "react-bootstrap"

const MyForm = ({ onSaveContact, editingContact, onUpdateContact }) => {

    // This is the original State with not initial student 
    const [contact, setContact] = useState(editingContact || {
        name: "",
        phone_number: "",
        email: "",
        birthdate: ""
    });

    //create functions that handle the event of the user typing into the form
    const handleNameChange = (event) => {
        const name = event.target.value;
        setContact((contact) => ({ ...contact, name }));

    };

    const handlePhoneNumberChange = (event) => {
        const phone_number = event.target.value;
        setContact((contact) => ({ ...contact, phone_number }));
    };

    const handleEmailChange = (event) => {
        const email = event.target.value;
        setContact((contact) => ({ ...contact, email }));
    };

    const handleBirthdayChange = (event) => {
        const birthday = event.target.value;
        setContact((contact) => ({ ...contact, birthday }));
    };
    const clearForm = () => {
        setContact({ name: "", phone_number: "", email: "", birthday: "" })
    }

    //A function to handle the post request
    const postContact = (newContact) => {
        return Promise.all([
            fetch("http://localhost:8080/api/contacts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newContact),
        }),
        fetch("http://localhost:8080/api/details", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({ ...newContact, birthday: newContact.birthday})
        })
    ])
            .then(([contactResponse, detailsResponse]) => Promise.all ([
                contactResponse.json(),
                detailsResponse.json()
           ]))
            .then(([contactData, detailsData]) => {
                //console.log("From the post ", data);
                //I'm sending data to the List of Students (the parent) for updating the list
                onSaveContact({ contact: contactData, detail: detailsData });
                //this line just for cleaning the form
                clearForm();
            });
    };

    //A function to handle the post request
    const putContact = (toEditContact) => {
        return Promise.all([
        fetch(`http://localhost:8080/api/contacts/${toEditContact.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(toEditContact)
        }),
        fetch(`http://localhost:8080/api/details/${toEditContact.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({ ...toEditContact, birthday: toEditContact.birthday })
        })
    ])
            .then(([contactResponse, detailsResponse]) => Promise.all([
                contactResponse.json(),
                detailsResponse.json()
            ]))
            .then(([contactData, detailsData]) => {
                onUpdateContact({ contact: contactData, detail: detailsData});
                //this line just for cleaning the form
                clearForm();
            });
    };


    //A function to handle the submit in both cases - Post and Put request!
    const handleSubmit = (e) => {
        e.preventDefault();
        if (contact.id) {
            putContact(contact);
        } else {
            postContact(contact);
        }
    };

    return (
        <Form className='form-contacts' onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <input
                    type="text"
                    id="add-name"
                    placeholder="e.g. Jane Doe"
                    required
                    value={contact.name}
                    onChange={handleNameChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Phone Number</Form.Label>
                <input
                    type="text"
                    id="add-phone-number"
                    placeholder="e.g. 4151234567"
                    required
                    maxLength={10}
                    value={contact.phone_number}
                    onChange={handlePhoneNumberChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <input
                    type="email"
                    id="add-email"
                    placeholder="e.g. janedoe@coldmail.com"
                    required
                    value={contact.email}
                    onChange={handleEmailChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Birthday</Form.Label>
                <input
                    type="date"
                    id="add-birthday"
                    required
                    value={contact.birthday}
                    onChange={handleBirthdayChange}
                />
            </Form.Group>
            <Form.Group>
            <Button type="submit" variant="outline-success">{contact.id ? "Edit Contact" : "Add Contact"}</Button>
            {contact.id ? <Button type="button" variant="outline-warning" onClick={clearForm}>Cancel</Button> : null}
            </Form.Group>
        </Form>
    );
};


export default MyForm