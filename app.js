const yargs = require("yargs");
const { hideBin } = require("yargs/helpers")
const {program} = require("commander")

const contacts = require("./db");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "readContact":
      const allContacts = await contacts.listContacts();
      return console.log("allContacts: ", allContacts);
      break;
    case "getContactById":
      const getContact = await contacts.getContactById(id);
      return console.log("getContactById: ", getContact);
      break;
    case "removeContact":
      const removeContact = await contacts.removeContact(id);
      return console.log("removeContact: ", removeContact);
      break;
    case "addContact":
      const newContact = await contacts.addContact(name, email, phone);
      return console.log("addContact: ", newContact);
      break;
    case "updateContactById":
      const updateContact = await contacts.updateContactById(id, {
        name,
        email,
        phone,
      });
      return console.log("updateContact: ", updateContact);
      break;
    default:
      console.warn(`\x1B[31m Unknown action type!`);
  }
};

// invokeAction({ action: "readContact" });
// invokeAction({ action: "getContactById", id: "drsAJ4SHPYqZeG-83QTVW" });
// invokeAction({ action: "removeContact", id: "vEmJCfKuJMnOm2RDdZ84O" });
// invokeAction({
//   action: "addContact",
//   name: "gis",
//   email: "pretty@gmail.com",
//   phone: "+123456789",
// });
// invokeAction({
//   action: "updateContactById",
//   id: "KUDZ6aSwXooUhdPjKRvmG",
//   name: "GIS",
//   email: "pretty.boy@gmail.com",
//   phone: "+123456789",
// });
// invokeAction({
//   action: "updateContactById",
//   id: "ZeJoh52-S4CGLQvj0vjDg",
//   name: "Leaflet",
//   email: "pretty.map@gmail.com",
//   phone: "+123456789",
// });

// console.log("process.argv", process.argv);

//! yargs

// const arr = hideBin(process.argv);
// // console.log("arr", arr);
// const { argv } = yargs(arr);
// // console.log("argv", argv);
// invokeAction(argv);

//! commander

program
    .option('-a, --action <type>', 'choose action')
    .option('-i, --id <type>', 'contact id')
    .option('-n, --name <type>', 'contact name')
    .option('-e, --email <type>', 'contact email')
    .option('-p, --phone <type>', 'contact phone');

program.parse();

const argv = program.opts();
invokeAction(argv)

