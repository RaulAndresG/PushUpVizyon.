import Cargo from "../models/Cargo.js";
import { response } from "express";
import generateJWT from "../helpers/generateJWT.js"
import bcryptjs from "bcryptjs";

const login = async (req,res=response)=>{
    const {email,password} = req.body;
    try {     
        const Cargo = await Cargo.findOne({email});
        if(!Cargo)
            return res.status(400).json({message:"Cargo incorrecto"});
        if(!Cargo.estado)
            return res.status(400).json({mesage: "Cargo desactivado"});
        const validatpassword= bcryptjs.compareSync(password, Cargo.password);
        if(!validatpassword)
                return res.status(400).json({mesage: "contraseña Incorrecta"});
        const token = await generateJWT(Cargo._id);
        res.cookie("token",token);
        res.json({Cargo,token})
    } catch (error) {
        console.log(error);
        return res.json({message:"Auto contactarme (Servicio tecnico)"})
    }

}
export default login;