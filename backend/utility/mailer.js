const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
const   sender =(props)=>{ // gets all the values from the route function and sends the mail.
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'xxxxx@gmail.com',
        pass: 'xxxxxxx'
    }
});

// setup email data with unicode symbols
let mailOptions = {
    from: 'xxxxx', // sender address
    to: 'props.Email', // list of receivers
    subject: 'props.Subject', // Subject line
    text: `${props.Msg}`, // plain text body       // we need Subject and Msg from the frontend rest id would resolve.
    //html: '<b>Hello world?</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return ("Email Not Sent");
    }
    else
    return ("Message Send Successfully"); 
});

}
module.exports =sender;
