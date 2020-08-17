import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

import { getTemplateMailUser } from '../libs/templates/mailclient'

const transporter = nodemailer.createTransport({

    service: 'Yandex',
    host: 'smtp.yandex.ru',
    port: 465,
    secure: true,
    auth: {
        user: process.env.USER_MAIL,
        pass: process.env.PASSWORD_USER_MAIL,
    }

});

export function sendMail( to: string | Array<string>, nameClient: string ){

    transporter.sendMail( 
        { from: process.env.USER_MAIL, 
          to, 
          subject: 'Solicitud de Servicio Trasteos Durán',
          html: getTemplateMailUser(nameClient)
        } 
        , function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email enviado a: ' + info.response);
        }
      });

}

