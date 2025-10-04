// import nodeMailer from 'nodemailer';

// // emailkaage ii passwordkaaga email wax laga diri rabo 
// const email = "odaykaarshe@gmail.com"
// const password = "ojsd rrnt xflj znlq" //app-password isticmaal badalka passworka

// let transporter = nodeMailer.createTransport({
//     service: 'gmail', 
//     auth: {
//         user: process.env.SENDER_EMAIL || email, 
//         pass: process.env.SENDER_PASSWORD || password, 
//     }
// });

// export const SendMyEmail = (mailOptions) => {
//     // Send the email
//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             return console.log('Error occurred: ' + error.message);
//         }
//         console.log('Email sent: %s', info.messageId);
//     });
    
// }


// export default transporter;




import nodemailer from "nodemailer";

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SENDER_EMAIL || 'odaykaarshe@gmail.com' ,
    pass: process.env.SENDER_PASSWORD ||  'ojsd rrnt xflj znlq'
  },
});

export const SendMyEmail = (mailOptions) => {
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Error occurred: ' + error.message);
        }
        console.log('Email sent: %s', info.messageId);
    });
    
}

export default transporter;
