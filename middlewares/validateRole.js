import Rol from "../models/Rol.js";
const role = async (req,res,next)=>{
    if(!req.usuario)
        return res.status(400).json({message:"Se quiere validar el rango sin el token"});
        
    const gerente = await Rol.findOne({rol:"gerenteRol"});

    if((JSON.stringify(req.usuario.rol)) !== (JSON.stringify(gerente._id)))
        return res.status(550).json({message:`${req.usuario.nombre} No es Gerente - no tiene permiso`});
    
    next()
}

const gerenteadmin = async (req,res,next)=>{
    if(!req.usuario)
        return res.status(400).json({message:"Debe tener un token para realizar esta accion..."});
    
    const gerente = await Rol.findOne({rol:"gerenteRol"});
    const admin = await Rol.findOne({rol: "adminRol"});

    if((String(req.usuario.rol)) !== (String(gerente._id)) && (String(req.usuario.rol)) !== (String(admin._id)))
        return res.status(550).json({message:`${req.usuario.nombre} No es Gerente ni admin - no tiene permiso`});
    
    next()
}

const admin = async (req,res,next)=>{
    if(!req.usuario)
        return res.status(400).json({message:"Debe tener un token para realizar esta accion..."});

    const admin = await Rol.findOne({rol:"adminRol"});

    if(String(req.usuario.rol) !== String(admin._id))
    return res.status(550).json({message:`${req.usuario.nombre}, No es admin no puede realizar esta accion...`});

    next();
}

const cargoadmin = async (req,res,next)=>{
    if(!req.usuario)
    return res.status(400).json({message:"Debe tener un token para realizar esta accion..."});

    const admin = await Rol.findOne({rol:"adminRol"});
    const cargo = await Rol.findOne({rol:"cargoRol"});

    if(String(req.usuario.rol) !== String(admin._id) && String(req.usuario.rol) !== String(cargo._id))
    return res.status(550).json({message:`${req.usuario.nombre}, No es admin ni cargo...`});

    next();
}
export {role, gerenteadmin, admin, cargoadmin};