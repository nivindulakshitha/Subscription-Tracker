import dayjs from "dayjs";
import { emailTemplates } from "./email-template";
import { NODEMAILER_EMAIL } from "../config/env";
import transporter from "../config/nodemailer.js";

export const sendReminderEmail = async ({ to, type, subscription }) => {
    if (!to || !type) throw new Error('Email and type are required');

    const template = emailTemplates.find(t => t.label === type);

    if (!template) throw new Error('Invalid email type');

    const mailInfo = {
        'username': subscription.user.name,
        'subscriptionName': subscription.name, 
        'renewalDate': dayjs(subscription.renewalDate).format('MMMM DD, YYYY'),
        'planName': subscription.name,
        'price': `${subscription.currency} ${subscription.price} (${subscription.interval})`,
        'paymentMethod': subscription.paymentMethod,
    }

    const message = template.generateBody(mailInfo);
    const subject = template.generateSubject(mailInfo);

    const mailOptions = {
        from: NODEMAILER_EMAIL,
        to: to,
        subject: subject,
        html: message
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}