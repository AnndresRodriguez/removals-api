import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

import { getTemplateMailUser } from '../libs/templates/mailclient'

const transporter = nodemailer.createTransport({
    
    service: process.env.SERVICE_MAIL,
    auth: {
        user: process.env.USER_MAIL,
        pass: process.env.PASSWORD_USER_MAIL,
    }

});

export function sendMail( to: string | Array<string>, nameClient: string ){

    transporter.sendMail( 
        { from: 'trasteosduranapp@gmail.com', 
          to, 
          subject: 'Solicitud de Servicio Trasteos Durán',
          html: getTemplateMailUser(nameClient)
        } 
        , function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

}

