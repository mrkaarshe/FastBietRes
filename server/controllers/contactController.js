import Contact from '../models/contactMode.js'; // Ensure the path is correct
import { SendMyEmail } from '../config/nodeMailer.js'; // Ensure the path is correct

// FastBite email HTML template
const fastBiteEmail = (title, bodyHtml) => `
<html>
  <body style="font-family: 'Arial', sans-serif; background-color: #ffff; margin: 0; padding: 0;">

    <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh; padding: 10px;">

      <!-- Main Card -->
      <div style=" background-color: #ffffff; border-radius: 20px; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1); width: 100%; max-width: 450px; text-align: center; padding: 20px; transition: transform 0.3s ease;">

        <!-- Card Header -->
        <div style="text-align: center; font-size: 5rem; color: #dfb407;">fast<span style="color: #000;">Bite</span></div>
         
         <div style=" text-align: center; font-size: 0.9rem; color: #000000; font-weight: lighter;">The Fastest Food Delivery in Somalia</div>

        <!-- Card Body -->
        <div style="text-align: start; margin-bottom: 20px; color: #000;">
          <span style="font-size: 0.9rem; font-weight: bold; color: #000;">Hello!</span>
          <p style="font-size: 1rem; color: #555;">${title}</p>
        </div>

        <!-- Card Content -->
        <section style="background-color: #000000; padding: 20px; border-radius: 10px; color: #ffffff; line-height: 1.6;">
          ${bodyHtml}
        </section>

        <!-- Card Footer -->
        <footer style="background-color: #dfb407; padding: 15px 0; border-radius: 10px; color: #ffffff; margin-top: 20px;">
          <p style="font-size: 14px; margin: 0;">© ${new Date().getFullYear()} FastBite. All rights reserved.</p>
        </footer>

      </div>

    </div>

  </body>
</html>


`;

// Create contact and send emails
export const createContact = async (req, res) => {
  const { name, email, message, phone } = req.body; // Remove password

  try {
    const contact = new Contact({
      name,
      email,
      message,
      phone
    });

    // Save contact to the database
    await contact.save();

    // Prepare email to user (auto-reply)
    const mailOptionsToUser = {
      from: process.env.SENDER_EMAIL || "odaykaarshe@gmail.com", // Ensure sender email is valid
      to: email, // User email (auto-reply)
      subject: `Thank you for contacting us, ${name}`,
      text: `
        Hi ${name},

        Thank you for contacting us! We have received your message and will respond shortly.

        Your message details:
        Name: ${name}
        Email: ${email}
        Message: ${message}

        Best regards,
        FAST-BITE Team
      `,
      html: fastBiteEmail(
        `Welcome to FastBite, ${name}!`, 
        `<p style="color:white; font-size:16px;">Thank you for reaching out to us! We will respond to your inquiry shortly. <span>${email}</span></p>
        <p style="color:white; font-size:16px;">Enjoy delicious meals delivered fast!</p>
        <p style="color:white; font-size:16px;">Best regards,</p>
        <p style="color:white; font-size:16px; font-weight:bold;">The FastBite Team</p>`
      ) // Ensure the HTML email body is passed correctly
    };

    console.log("SENDER_EMAIL:", process.env.SENDER_EMAIL);
    console.log("SENDER_EMAIL_PASSWORD:", process.env.SENDER_EMAIL_PASSWORD);

    try {
      // Send to user (auto-reply)
      await SendMyEmail(mailOptionsToUser);
      res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
      console.error('Error sending email:', error.message);
      res.status(500).json({ error: 'There was an issue sending the email.' });
    }
  } catch (error) {
    console.error('Error saving contact:', error.message);
    res.status(500).json({ error: 'Error saving contact' });
  }
};

// Fetch the latest contact submission
export const getContacts = async (req, res) => {
  try {
    const contact = await Contact.findOne()// Get the latest contact submission
    if (!contact) {
      return res.status(404).json({ error: 'No contacts found' });
    }

    res.status(200).json(contact); // Return the latest contact
  } catch (error) {
    console.error('Error fetching contact:', error.message);
    res.status(500).json({ error: 'Error retrieving latest contact' });
  }
};
