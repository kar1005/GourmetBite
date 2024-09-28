const ContactUs = require('../models/contactus');
const nodemailer = require('nodemailer');


exports.getContactUs = async (req,res)=>{
    try{
        const contact = await ContactUs.find();
        res.status(200).json(contact);
    }catch{
        res.status(500).send({message: 'Error fetching coupons'});
    }
};

exports.getContactUsByID = async (req,res)=>{
    try{
        const  contact = ContactUs.findById(req.params.id);
        if(!contact){
            res.status(404).send({message:'ContactUs not found'});
        }
    }catch{
        res.status(500).send({mesaage:'Error fetching contact'});
    }
}

exports.addContactUs = async(req,res)=>{

    const{name,email,message} = req.body;

    let testaccount  = await nodemailer.createTestAccount();
    let transporter = await nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth:{
            user: 'terrence.legros@ethereal.email',
            pass: 'PGX54VBCqrdw7hMh3b',
        }
    });
 
    let info  = await transporter.sendMail({
        from: email,
        to: "khushiruparelia2004@gmail.com ",
        subject: 'Contact Us',
        text: message,
    },(error, info) => {
        if (error) {
            return res.status(500).send('Error sending email.');
        }
        res.send('Email sent successfully!');
    });


    try{
        const contact = new ContactUs(req.body);
        await contact.save();
        res.status(200).json({message:'ContactUs added sucessfully'});
    }catch(error){
        res.status(400).json({mesaage:error.mesaage});
    }
}

exports.updateContactUs = async(req,res)=>{
    try{
        const contact = await ContactUs.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true,
        });
        if(!contact){
            return res.status(404).json({ message: 'ContactUs not found' });
        }
    }catch(error){
        res.status(400).json({message:error.mesaage});
    }
}

exports.deleteById = async(req,res)=>{
    try{
        const coupon = await ContactUs.findByIdAndDelete(req.params.id);
        if(!coupon){
            res.status(200).json({message:'ContactUs not found'});
        }
    }catch(error){
        res.status(400).json({message:error.mesaage});
    }
}

exports.NotValidRoute = async(req,res) => {
    res.status(400).json({ message: "Enter Valid Route" });
}