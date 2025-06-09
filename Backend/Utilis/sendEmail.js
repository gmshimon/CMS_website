import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'simon.rosedale99@gmail.com',
        pass:'vwnn uoep dtmo kfab'
    },
})

export const sendEmail = async(to,subject="Test Subject",text="test text for email",html)=>{
    await transporter.sendMail({
        from :'simon.rosedale99@gmail.com',
        to,
        subject,
        text,
        html
    })
}