var mailer = require('nodemailer');
import {nodemailer} from '../config'

export class Nodemailer {
    static async send(html: string, subject: string, email: string) {
        var transporter = mailer.createTransport({
            host: nodemailer.host,
            port: nodemailer.port,
            secure: nodemailer.port == 456, // true for 465, false for other ports
            auth: {
                user: nodemailer.username,
                pass: nodemailer.password
            },
        });

        var mailOptions = {
            from: 'support@yellowbox.com',
            to: email,
            subject: subject,
            text: html
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}

