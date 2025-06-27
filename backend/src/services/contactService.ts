import { Contact } from '../models/contactModel';

export const processContact = async (contact: Contact) => {
  // Here you could save to DB, send email, etc.
  console.log('Contact received:', contact);
}; 