import React, { useState, useEffect } from 'react'
import * as ioicons from 'react-icons/io5'
import MyForm from './Form';
import Contact from './Contact';
import ContactDetails from './ContactDetails'


const ListContacts = () => {

    // this is my original state with an array of contacts 
    const [contacts, setContacts] = useState([]);

    //this is the state needed for the UpdateRequest
    const [editingContact, setEditingContact] = useState(null)

    // sets initial state of showing contact details to false
    const [showDetails, setShowDetails] = useState(false);

    // when called, checks if prevstate matches the contactid in a parameter, if they do the state is called to false (hiding details)
    const toggleDetailsVisibility = (contactId) => {
        setShowDetails(prevState => prevState === contactId ? false : contactId);
    }

    const loadContacts = () => {
        // A function to fetch the list of contacts that will be load anytime that list change
        fetch("http://localhost:8080/api/contacts")
            .then((response) => response.json())
            .then((contacts) => {
                setContacts(contacts);
            });
    }

    useEffect(() => {
        loadContacts();
    }, [contacts]);

    const onSaveContact = (newContact) => {
        //console.log(newStudent, "From the parent - List of contacts");
        setContacts((contacts) => [...contacts, newContact]);
    }


    //A function to control the update in the parent (contact component)
    const updateContact = (savedContact) => {
        // This function should update the whole list of contacts - 
        loadContacts();
    }

    //A function to handle the Delete funtionality
    const onDelete = (contact) => {
        //console.log(student, "delete method")
        return fetch(`http://localhost:8080/api/contacts/${contact.id}`, {
            method: "DELETE"
        }).then((response) => {
            //console.log(response);
            if (response.ok) {
                loadContacts();
            }
        })
    }

    //A function to handle the Update functionality
    const onUpdate = (toUpdateContact) => {
        //console.log(toUpdateStudent);
        setEditingContact(toUpdateContact);

    }



    return (
        <div className="mybody">
        <div className="list-contacts">
            <h2>Contacts</h2>
            <ul>
                {contacts.map((contact) => {
                    return <li key={contact.id}> 
                        <Contact 
                            contact={contact} 
                            toDelete={onDelete} 
                            toUpdate={onUpdate} 
                            toggleDetailsVisibility={toggleDetailsVisibility}
                        />
                        {/* displays contact details if the current state equals a contact id */}
                        {contact.id === showDetails && <ContactDetails contact={contact} />}
                    </li>
                })}
            </ul>
        </div>
        <MyForm key={editingContact ? editingContact.id : null} onSaveContact={onSaveContact} editingContact={editingContact} onUpdateContact={updateContact} />
        </div>
    );
}


export default ListContacts