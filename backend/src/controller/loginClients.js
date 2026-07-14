import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

import {config} from "../../config.js";

import customerModel from "../models/customers.js";
 

const loginCustomersController = {};

loginCustomersController.login = async (req, res) => {
    try {
        
        const {email, password} = req.body;

        
        const customerFound = await customerModel.findOne({email})

        
        if(!customerFound){
            return res.status(400).json({message: "customer not found"})
        }

       
        if(customerFound.timeOut && customerFound.timeOut > Date.now()){
            return res.status(403).json({message: "Blocked account"})
        }

       
        const isMatch = await bcrypt.compare(password, customerFound.password)

        //Si la contraseña esta incorrecta
        if(!isMatch){
            //Sumar 1 ala cantidad de intentos fallidos
            customerFound.loginAttempts = (customerFound.loginAttempts || 0)+1
            if(customerFound.loginAttempts >= 5){
                customerFound.timeOut = Date.now() + 15*60*1000;
                customerFound.loginAttempts = 0;

                await customerFound.save();

                return res.status(403).json({message: "Blocked account for many attemmps"})

            }
            await customerFound.save();

            return res.status(401).json({message: "wrong password"})
       }

       customerFound.loginAttempts = 0;
       customerFound.timeOut = null;

      
       const token = jsonwebtoken.sign(
         
          {id: customerFound._id, useType: "customer"},
          
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

export default loginCustomersController;