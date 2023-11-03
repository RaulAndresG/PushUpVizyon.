
//Express
const express = require('express');
//Mongodb 
const { MongoClient, ObjectId } = require('mongodb');
///
const moment = require('moment');
require('dotenv').config();
///
const router = express.Router();

const bases = process.env.MONGO_URI;
const nombrebase = 'PushUpVizyon';

router.get('/enpo1', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombrebase);
        const ventasCollection = db.collection('venta');
        const result = await ventasCollection.find({
            Fecha: {
                $gte: new Date('2023-07-01'),
                $lt: new Date('2023-08-01')
            }
        }).toArray();
        res.json({
            msg: "Lista de todas las ventas realizadas en julio de 2023.",
            result
        });
        client.close();
    } catch (error) {
        console.log(error, "Error en el endpoint de ventas-julio-2023.");
    }
});

router.get('/enpo2', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombrebase);
        const empleadosCollection = db.collection('empleado');
        const result = await empleadosCollection.aggregate([
            {
                $lookup: {
                    from: 'cargos',
                    localField: 'IdCargoFk',
                    foreignField: '_id',
                    as: 'cargo'
                }
            },
            {
                $lookup: {
                    from: 'municipio',
                    localField: 'IdMunicipioFk',
                    foreignField: '_id',
                    as: 'municipio'
                }
            },
            {
                $project: {
                    _id: 1,
                    nombre: 1,
                    cargo: { $arrayElemAt: ['$cargo', 0] },
                    municipio: { $arrayElemAt: ['$municipio', 0] }
                }
            }
        ]).toArray();
        res.json({
            msg: "Lista de todos los empleados con sus respectivos cargos y municipios.",
            result
        });
        client.close();
    } catch (error) {
        console.log(error, "Error en el endpoint de empleados-cargos-municipios.");
    }
});

router.get('/enpo3', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombrebase);
        const ventasCollection = db.collection('venta');
        const result = await ventasCollection.aggregate([
            {
                $lookup: {
                    from: 'clientes',
                    localField: 'IdClienteFk',
                    foreignField: '_id',
                    as: 'cliente'
                }
            },
            {
                $lookup: {
                    from: 'forma de pago',
                    localField: 'IdFormaPagoFk',
                    foreignField: '_id',
                    as: 'forma_pago'
                }
            },
            {
                $project: {
                    _id: 1,
                    Fecha: 1,
                    cliente: { $arrayElemAt: ['$cliente', 0] },
                    forma_pago: { $arrayElemAt: ['$forma_pago', 0] }
                }
            }
        ]).toArray();
        res.json({
            msg: "Lista de todas las ventas con la información de los clientes y la forma de pago.",
            result
        });
        client.close();
    } catch (error) {
        console.log(error, "Error en el endpoint de ventas-clientes-formas-pago.");
    }
});

router.get('/enpo4', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombrebase);
        const ordenesCollection = db.collection('orden');
        const result = await ordenesCollection.aggregate([
            {
                $lookup: {
                    from: 'clientes',
                    localField: 'IdClienteFk',
                    foreignField: '_id',
                    as: 'cliente'
                }
            },
            {
                $lookup: {
                    from: 'empleados',
                    localField: 'IdEmpleadoFk',
                    foreignField: '_id',
                    as: 'empleado'
                }
            },
            {
                $project: {
                    _id: 1,
                    IdOrdenFk: 1,
                    cliente: { $arrayElemAt: ['$cliente', 0] },
                    empleado: { $arrayElemAt: ['$empleado', 0] }
                }
            }
        ]).toArray();
        res.json({
            msg: "Detalles de todas las órdenes junto con los nombres de los empleados y clientes asociados.",
            result
        });
        client.close();
    } catch (error) {
        console.log(error, "Error en el endpoint de detalles-ordenes-empleados-clientes.");
    }
});

router.get('/enpo5', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombrebase);
        const inventarioCollection = db.collection('inventario');
        const result = await inventarioCollection.aggregate([
            {
                $lookup: {
                    from: 'talla',
                    localField: 'IdTallaFk',
                    foreignField: '_id',
                    as: 'talla'
                }
            },
            {
                $lookup: {
                    from: 'color',
                    localField: 'IdColorFk',
                    foreignField: '_id',
                    as: 'color'
                }
            },
            {
                $project: {
                    _id: 1,
                    CodInv: 1,
                    ValorVtaCop: 1,
                    ValorVtaUsd: 1,
                    talla: { $arrayElemAt: ['$talla', 0] },
                    color: { $arrayElemAt: ['$color', 0] }
                }
            }
        ]).toArray();
        res.json({
            msg: "Lista de productos disponibles en el inventario junto con su talla y color.",
            result
        });
        client.close();
    } catch (error) {
        console.log(error, "Error en el endpoint de productos-inventario.");
    }
});

router.get('/enpo6', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombrebase);
        const proveedorCollection = db.collection('proveedor');
        const result = await proveedorCollection.aggregate([
            {
                $lookup: {
                    from: 'insumo_proveedor',
                    localField: 'Id',
                    foreignField: 'IdProveedorFk',
                    as: 'insumos_proveidos'
                }
            },
            {
                $lookup: {
                    from: 'insumo',
                    localField: 'insumos_proveidos.IdInsumoFk',
                    foreignField: '_id',
                    as: 'insumos'
                }
            },
            {
                $project: {
                    _id: 1,
                    NitProveedor: 1,
                    Nombre: 1,
                    insumos: 1
                }
            }
        ]).toArray();
        res.json({
            msg: "Lista de todos los proveedores junto con la lista de insumos que suministran a la fábrica.",
            result
        });
        client.close();
    } catch (error) {
        console.log(error, "Error en el endpoint de proveedores-insumos.");
    }
});


router.get('/enpo7', async (req, res) => {
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombrebase);
        const ventaCollection = db.collection('venta');
        const result = await ventaCollection.aggregate([
            {
                $group: {
                    _id: "$IdEmpleadoFk",
                    totalVentas: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: 'empleado',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'empleado'
                }
            }
        ]).toArray();
        res.json({
            msg: "Cantidad de ventas realizadas por cada empleado.",
            result
        });
        client.close();
    } catch (error) {
        console.log(error, "Error en el endpoint de ventas-por-empleado.");
    }
});





module.exports = router;