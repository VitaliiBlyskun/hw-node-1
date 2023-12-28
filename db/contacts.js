const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

// const contactsPath = "/db/contacts.json";
// const contactsPath = `${__dirname}/contacts.json`;
// console.log("contactsPath", contactsPath)

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const contactID = String(contactId)
    const allContacts = await listContacts();
    const result = allContacts.find((contact) => contact.id === contactID );
    // console.log("result:", result);
    if (!result) {
      return null;
    }
    return result;
  } catch (error) {
    console.log(error.message);
  }
}

//* yargs
// async function removeContact(contactId) {
//   const contactID = String(id)
//   const contacts = await listContacts();
//   const index = contacts.findIndex((contact) => contact.id === contactID);
//   console.log("index", index);
//   if (index === -1) {
//     return null;
//   }
//   const [result] = contacts.splice(index, 1);
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return result;
// }

//* commander
async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  console.log("index", index);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = { id: nanoid(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
}

async function updateContactById(id, data) {
  const contactID = String(id)
  const contacts = await listContacts();
  // console.log("contacts", contacts)
  const index = contacts.findIndex((contact) => contact.id === String(id));
  console.log("index", index);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, ...data };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
}


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
};

