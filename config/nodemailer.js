import nodemailer from 'nodemailer'
import { NODEMAILER_EMAIL, NODEMAILER_PASSWORD } from './env.js'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: NODEMAILER_EMAIL,
        pass: NODEMAILER_PASSWORD
    }
})

export default transporter