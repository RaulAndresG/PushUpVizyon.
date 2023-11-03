import {Schema,model} from "mongoose";

const Cargoschema = Schema({
    descripcion:{type:String,trim:true,required:[true]},
    sueldo_base:{type:String,trim:true,required:[true]},
})
const Cargos = model('cargos',Cargoschema,'cargos');
export default Cargos;