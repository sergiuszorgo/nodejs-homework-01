const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "/db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    console.table(contacts);
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const contactFyndById = contacts.find(
      (contact) => contact.id === contactId
    );
    console.log(contactFyndById);
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const filteredContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    const contactsList = JSON.stringify(filteredContacts, null, "\t");
    fs.writeFile(contactsPath, contactsList, "utf-8", (err) => {
      if (err) console.log(err);
    });
    console.log(`contact: ${contactId} was deleted from Contact List`);
    listContacts();
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const newContact = { id: nanoid(), name, email, phone };
    const contactsList = JSON.stringify([newContact, ...contacts], null, "\t");
    fs.writeFile(contactsPath, contactsList, "utf-8", (err) => {
      if (err) console.error(err);
    });
    console.log(`contact ${name} added`);
    listContacts();
  } catch (error) {
    console.log(error);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
