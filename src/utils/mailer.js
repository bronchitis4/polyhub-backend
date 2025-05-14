import nodemailer from 'nodemailer';


export class Mailer {
    constructor() {
        this.email = 'd.dumyak@gmail.com';
        this.transporter = nodemailer.createTransport({ 
            service: 'gmail',
            auth: {
                user: this.email,
                pass: 'zmau wuxu jwdd nobc'
            }
        });
    }
    
    generateCode = () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    sendVerificationEmail = async (toEmail, code) => {
        const mailOptions = {
            from: this.email,
            to: toEmail,
            subject: 'Підтвердження пошти PolyHub',
            text: `Ваш код підтвердження: ${code}`
        };

        await this.transporter.sendMail(mailOptions);
        console.log(`Код надіслано на ${toEmail}: ${code}`);
    }
}
