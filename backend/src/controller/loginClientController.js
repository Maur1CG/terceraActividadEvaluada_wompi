import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

import {config} from "../../config.js";

import clientModel from "../models/client.js";
 

const loginClientController = {};

loginClientController.login = async (req, res) => {
    try {
        
        const {email, password} = req.body;

        
        const clientFound = await clientModel.findOne({email})

        
        if(!clientFound){
            return res.status(400).json({message: "customer not found"})
        }

       
        if(clientFound.timeOut && clientFound.timeOut > Date.now()){
            return res.status(403).json({message: "Blocked account"})
        }

       
        const isMatch = await bcrypt.compare(password, clientFound.password)

        //Si la contraseña esta incorrecta
        if(!isMatch){
            //Sumar 1 ala cantidad de intentos fallidos
            clientFound.loginAttempts = (clientFound.loginAttempts || 0)+1
            if(clientFound.loginAttempts >= 5){
                clientFound.timeOut = Date.now() + 15*60*1000;
                clientFound.loginAttempts = 0;

                await clientFound.save();

                return res.status(403).json({message: "Blocked account for many attemmps"})

            }
            await clientFound.save();

            return res.status(401).json({message: "wrong password"})
       }

       clientFound.loginAttempts = 0;
       clientFound.timeOut = null;

      
       const token = jsonwebtoken.sign(
         
          {id: clientFound._id, useType: "Client"},
          
           config.JWT.secret,
           
           {expiresIn: "30d"}
          
       )
       res.cookie("authCookie", token);

       return res.status(200).json({message: "Login successful", token});
    } catch (error) {
        console.log("error"+error)
        return res.status(500).json({message: "Internal server error"})
       
    }
};

export default loginClientController;