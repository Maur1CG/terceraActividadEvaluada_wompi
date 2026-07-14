import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken"
import bcryptjs from "bcryptjs"

import config from "../../config.js";

import clientModel from "../models/client.js"

const registerClientController = {};

registerClientController.register = async (req, res) => {
    try {
        let {name, email, password, isVerified, loginAttemps, timeOut} = req.body;

        const exitsClient = await clientModel.findOne({email});
        if(exitsClient){
            return res.status(400).json({message: "Client already exits"});
        }
        const passwordHashed = await bcryptjs.hash(password,10);

        const randomCode = crypto.randomBytes(3).toString("hex");

        const token = jsonwebtoken.sign(
            {
                randomCode,
                name,
                email,
                password: passwordHashed,
                isVerified,
                loginAttemps,
                timeOut
            },

            config.JWT.secret,

            { expiresIn: "15m"}
        );

        res.cookie("registrationCookie", token, {maxAge: 15*60*1000})

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email.user_email,
                pass: config.email.user_password,
            }
        });

        const mailOptions = {
            from: config.email.user_email,
            to: email,
            subject: "Email verification",
            text: "para verificar tu correo ingresa el siguiente codigo" + randomCode + "expira en 15 minutos"
        };

        transporter.sendMail(mailOptions, (error, info)=>{
            if(error){
                console.log("error"+error);
                return res.status(500).json({message: "Error sendig email"})
            }

            return res.status(200).json({message: "Email sent"})
        })
    } catch (error) {
        console.log("error"+error)
        return res.status(500).json({message: "Internal server error"})
    }
};

registerClientController.verifyCode = async (req, res) => {
    try {
        const { verificationCodeRequest} = req.body;

        const token = req.cookies.registrationCookie;

        const decoded = jsonwebtoken.verify(token, config.JWT.secret);

        const {
            randomCode : storedCode,
            name,
            email,
            password,
            isVerified,
            loginAttemps,
            timeOut
        } = decoded

        if (verificationCodeRequest !== storedCode){
            return res.status (400).json ({message: "Invalid code"});
        }

        const newClient = clientModel({
            name,
            email,
            password,
            isVerified: true,
        });

        await newClient.save();

        res.clearCookie ("registrationCookie");

        return res.status(200).json({message: "Client registered"});
    } catch (error) {
        console.log("error"+error);
        return res.status(500).json({message: "Internal server error"});
    }
};

export default registerClientController