const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const db = require('./db/db-connection.js');


const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

// creates an endpoint for the route "/""
app.get('/', (req, res) => {
    res.json({ message: 'Hola, from My template ExpressJS with React-Vite' });
});

// create the get request for contacts in the endpoint '/api/contacts'
// returns joined table displaying all info - name, phone, email, bday
app.get('/api/contacts', async (req, res) => {
    try {
        const { rows: contacts } = await db.query(
            'SELECT details.contact_id, contacts.id, contacts.name, contacts.phone_number, contacts.email, details.birthday FROM details INNER JOIN contacts ON details.contact_id = contacts.id;');
        res.send(contacts);
    } catch (e) {
        return res.status(400).json({ e });
    }
});

app.get('/api/details', async (req, res) => {
    try {
        const { rows: details } = await db.query(
            'SELECT * FROM details;');
        res.send(details);
    } catch (e) {
        return res.status(400).json({ e });
    }
});

// create the POST request to create new row in contacts table
app.post('/api/contacts', async (req, res) => {
    try {
        const newContact = {
            name: req.body.name,
            phone_number: req.body.phone_number,
            email: req.body.email
        };
        //console.log([newStudent.firstname, newStudent.lastname, newStudent.iscurrent]);
        const contactResult = await db.query(
            'INSERT INTO contacts(name, phone_number, email) VALUES($1, $2, $3) RETURNING *'
            [newContact.name, newContact.phone_number, newContact.email],
        );
        console.log(contactResult.rows);
        res.json(contactResult.rows);
    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });
    }
});

// create the POST request to create new row in details table
app.post('/api/details', async (req, res) => {
    try {
        const newDetail = {
            birthday: req.body.birthday
        };
        const detailsResult = await db.query(
            'INSERT INTO details (birthday) VALUE ($1) RETURNING *')
            [newDetail.birthday];
        console.log(detailsResult.rows[0]);
        res.json(detailsResult.rows[0]);
    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });
    }
});

// // delete request for contacts
app.delete('/api/contacts/:id', async (req, res) => {
    try {
        const contactId = req.params.id;
        
        // delete from details table
        const detailsDeleteResult = await db.query(
            'DELETE FROM details WHERE contact_id=$1',
            [contactId]
        );
        // check if details were found
        if (detailsDeleteResult.rowCount === 0) {
            return res.status(404).json({ error: 'No associated details found' });
        }
        // delete from contacts table
        const contactsDeleteResult = await db.query(
            'DELETE FROM contacts WHERE id=$1 RETURNING *',
            [contactId]
        );
        // check if contact was found
        if (contactsDeleteResult.rowCount === 0) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        // return confirmation
        res.json({
            message: 'Contact and associated details deleted successfully',
            detail: detailsDeleteResult.rowCount > 0 ? {} : null,
            contact: contactsDeleteResult.rows[0]
        });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'An error occurred while deleting the contact' });
    }
});


// //A put request - Update a contact 
app.put('/api/contacts/:id', async (req, res) => {
    try {
        const contactId = req.params.id;
        const updatedContact = {
            name: req.body.name || null,
            phone_number: req.body.phone_number || null,
            email: req.body.email || null
        };
        // update contacts table using data from form
        const contactUpdateResult = await db.query(
            'UPDATE contacts SET name=$1, phone_number=$2, email=$3 WHERE id=$4 RETURNING *',
            [...Object.values(updatedContact), contactId]
        );
        // get the updated contact information
        const updatedContactInfo = contactUpdateResult.rows[0];
        // prepare the detail update object
        const detailUpdateObj = {
            ...updatedContact,
            birthday: updatedContact.birthday || null
        };
        // update details table
        const detailsUpdateResult = await db.query(
            'UPDATE details SET birthday=$1 WHERE contact_id=$2 RETURNING *',
            [detailUpdateObj.birthday, contactId]
        );
        // return the combined result
        res.json({
            contact: updatedContactInfo,
            detail: detailsUpdateResult.rows[0]
        });
    } catch (e) {
        console.error(e);
        return res.status(400).json({ error: e.message });
    }
});


// console.log that your server is up and running
app.listen(PORT, () => {
    console.log(`Hola, Server listening on http://localhost:${PORT}`);
});