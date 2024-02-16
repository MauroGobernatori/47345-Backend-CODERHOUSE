import { transporter } from "../services/emailService.js";

export const sendEmail = async (req, res) => {
    try{
        const { dest } = req.body;
        const emailOptions = {
            from: process.env.EMAIL,
            to: dest,
            subject: 'Welcome',
            text: `Password change, dest ${dest}`
        }

        const response = await transporter.sendMail(emailOptions)
        res.json(response);
    }catch(error){
        console.log(error);
    }
}