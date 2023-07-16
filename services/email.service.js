import nodemailer from 'nodemailer'

class EmailService{
    constructor(){
        this.trasporter = nodemailer.createTransport({
            service: "gmail",
            auth:{
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
        })
    }

    sendEmail(to, subject, html, attachments = []){
        return this.trasporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            html,
            attachments,
        })
    }
}

export default new EmailService();