import nodemailer from 'nodemailer';
import dotenv from 'dotenv'
dotenv.config();

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
          text: `Buen día ${nameClient} hemos recibido su solicitud realizada por medio de nuestro portal, en un plazo de 24 horas nos comunicaremos con usted, muchas Gracias por confiar en nuestros servicios`
        } 
        , function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

}

