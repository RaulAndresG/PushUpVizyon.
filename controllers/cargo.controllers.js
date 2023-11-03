import Cargos from "../models/Cargo.js";

const getCargos = async (req,res)=>{
    const {desde,hasta} = req.query;
    const query = {estado:true};
    const [total,Cargos] = await Promise.all([
        Cargos.countDocuments(query),
        Cargos.find(query).skip(Number(desde)).limit(Number(hasta))
    ]);
    res.json({total,Cargos});
}
const postCargo = async (req,res)=>{
    const newCargo = new Cargos(req.body)
    await newCargo.save()
    res.json(newCargo);
}

const deleteCargo = async(req,res)=>{
    const {id} = req.params
    await Cargos.findByIdAndDelete(id);
    res.json("Cargo eliminado");
}

const putCargo = async (req,res)=>{
    const {id} = req.params
    const updateCargo = await Cargos.findByIdAndUpdate(id,req.body,{new:true});
    res.json({message:"Cargo actualizado",updateCargo})
} 

export {getCargos, postCargo, deleteCargo, putCargo}
