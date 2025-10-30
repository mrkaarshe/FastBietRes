import Contact from '../models/contactMode.js'; // Ensure the path is correct

// Create contact and send emails
export const createContact = async (req, res) => {
  const { name, email, message, phone } = req.body; // Remove password

  try {
    const contact = new Contact({
      name,
      email,
      message,
      phone,
    });
    await contact.save();
    res.status(201).json(contact); // Respond with the created contact
  } catch (error) {
    console.error('Error saving contact:', error.message);
    res.status(500).json({ error: 'Error saving contact' });
  }
};

// Fetch all contact submissions
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find(); // Get all contact submissions
    if (!contacts || contacts.length === 0) {
      return res.status(404).json({ error: 'No contacts found' });
    }

    res.status(200).json(contacts); // Return all contacts
  } catch (error) {
    console.error('Error fetching contacts:', error.message);
    res.status(500).json({ error: 'Error retrieving contacts' });
  }
};

// Delete a contact by its _id
export const deleteContact = async (req, res) => {
  const { id } = req.params; // Get the id from the request parameters

  try {
    const contact = await Contact.findByIdAndDelete(id); // Delete the contact by id
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact deleted successfully' }); // Confirm deletion
  } catch (error) {
    console.error('Error deleting contact:', error.message);
    res.status(500).json({ error: 'Error deleting contact' });
  }
};
