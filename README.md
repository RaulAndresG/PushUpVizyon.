![](https://raw.githubusercontent.com/CampusLands/DER/main/DER.jpg)

**1. Listar todas las ventas que se realizaron en el mes de julio de 2023**

```sql
SELECT * FROM venta WHERE MONTH(Fecha) = 7 AND YEAR(Fecha) = 2023;
```

**2. Seleccionar todos los empleados con sus respectivos cargos y municipios**

```sql
SELECT e.nombre AS NombreEmpleado, c.descripcion AS Cargo, m.nombre AS Municipio
FROM empleado e
INNER JOIN cargos c ON e.IdCargoFk = c.IdCargo
INNER JOIN municipio m ON e.IdMunicipioFk = m.IdMunicipio;

```

**3. Obtener la lista de todas las ventas con la información de los clientes y la forma de pago**

```sql
SELECT v.*, cl.nombre AS NombreCliente, fp.descripcion AS FormaPago
FROM venta v
INNER JOIN cliente cl ON v.IdClienteFk = cl.id
INNER JOIN forma_pago fp ON v.IdFormaPagoFk = fp.IdFormaPago;

```

**4. Mostrar los detalles de todas las órdenes junto con los nombres de los empleados y clientes asociados**

```sql
SELECT o.*, e.nombre AS NombreEmpleado, cl.nombre AS NombreCliente
FROM orden o
INNER JOIN empleado e ON o.IdEmpleadoFk = e.IdEmpleado
INNER JOIN cliente cl ON o.IdClienteFk = cl.id;
```

**5. Listar los productos disponibles en el inventario junto con su talla y color**

```sql
SELECT i.*, t.descripcion AS Talla, c.descripcion AS Color
FROM inventario i
INNER JOIN talla t ON i.IdTallaFk = t.IdTalla
INNER JOIN color c ON i.IdColorFk = c.IdColor;
```

**6. Mostrar todos los proveedores junto con la lista de insumos que suminis**

```sql
SELECT p.*, i.nombre AS Insumo
FROM proveedor p
INNER JOIN insumo_proveedor ip ON p.IdProveedor = ip.IdProveedorFk
INNER JOIN insumo i ON ip.IdInsumoFk = i.IdInsumo;

```

**7. Encontrar la cantidad de ventas realizadas por cada empleado**

```sql
SELECT e.nombre AS NombreEmpleado, COUNT(*) AS CantidadVentas
FROM empleado e
INNER JOIN venta v ON e.IdEmpleado = v.IdEmpleadoFk
GROUP BY e.nombre;

```

**8. Mostrar la lista de órdenes en proceso junto con los nombres de los clientes y empleados asociados**

```sql
SELECT o.*, e.nombre AS NombreEmpleado, cl.nombre AS NombreCliente
FROM orden o
INNER JOIN empleado e ON o.IdEmpleadoFk = e.IdEmpleado
INNER JOIN cliente cl ON o.IdClienteFk = cl.id
WHERE o.IdEstadoFk = (SELECT IdTipoEstado FROM tipo_estado WHERE descripcion = 'En proceso');

```

**9. Obtener el nombre de la empresa y su respectivo representante legal junto con el nombre del municipio al que pertenecen**

```sql
SELECT e.razon_social AS Empresa, e.representante_legal AS RepresentanteLegal, m.nombre AS Municipio
FROM empresa e
INNER JOIN municipio m ON e.IdMunicipioFk = m.IdMunicipio;

```

**10. Mostrar la lista de prendas y su respectivo stock disponible**

```sql
SELECT p.Nombre AS Prenda, i.stock_min AS StockMinimo, i.stock_max AS StockMaximo
FROM prenda p
INNER JOIN inventario i ON p.IdPrenda = i.IdPrendaFk;

```

**11. Encontrar el nombre de los clientes que realizaron compras en una fecha específica junto con la cantidad de artículos comprados**

```sql
SELECT cl.nombre AS NombreCliente, COUNT(dv.IdProductoFk) AS CantidadArticulosComprados
FROM cliente cl
INNER JOIN venta v ON cl.id = v.IdClienteFk
INNER JOIN detalle_venta dv ON v.IdVenta = dv.IdVentaFk
WHERE v.Fecha = '2023-07-20'
GROUP BY cl.nombre;

```

**12. Mostrar la lista de empleados y la duración de su empleo en años **

```sql
SELECT nombre AS NombreEmpleado, TIMESTAMPDIFF(YEAR, fecha_ingreso, CURDATE()) AS AniosTrabajados
FROM empleado;

```

**13. Obtener el nombre de las prendas junto con el valor total de ventas en dólares para cada una **

```sql
SELECT p.Nombre AS Prenda, SUM(dv.cantidad * i.ValorVtaUsd) AS ValorTotalVentasUSD
FROM prenda p  
INNER JOIN inventario i ON p.IdPrenda = i.IdPrendaFkSELECT tp.descripcion AS TipoProteccion, COUNT(*) AS NumeroPrendasAsociadas
FROM tipo_proteccion tp
INNER JOIN prenda p ON tp.IdTipoProteccion = p.IdTipoProteccion
GROUP BY tp.descripcion;

INNER JOIN detalle_venta dv ON i.IdInventario = dv.IdProductoFk
GROUP BY p.Nombre;

```

**14. Obtener el nombre de las prendas junto con la cantidad mínima y máxima de insumos necesarios para su fabricación **

```sql
SELECT tp.descripcion AS TipoProteccion, COUNT(*) AS NumeroPrendasAsociadas
FROM tipo_proteccion tp
INNER JOIN prenda p ON tp.IdTipoProteccion = p.IdTipoProteccion
GROUP BY tp.descripcion;

```

**15. Obtener la lista de empleados y su información de contacto, incluyendo el nombre, el cargo y el municipio **

```sql

```

**16. Mostrar la lista de ventas realizadas en un rango de fechas específico junto con el nombre del cliente y la forma de pago **

```sql
# Consulta realizada ....
```

**17. Obtener el nombre de las prendas y su valor unitario en dólares junto con el estado de disponibilidad **

```sql
# Consulta realizada ....
```

**18. Mostrar la lista de clientes y la cantidad de compras que han realizado **

```sql
# Consulta realizada ....
```

**19. Obtener la lista de órdenes junto con el estado actual y la fecha en que se crearon **

```sql
# Consulta realizada ....
```

**20. Obtener el nombre y la descripción de los cargos con un sueldo base superior a 2.000.000  **

```sql
# Consulta realizada ....
```

**21. Mostrar la lista de clientes con sus respectivos municipios y países  **

```sql
# Consulta realizada ....
```

**22 Obtener el nombre y la descripción de los tipos de protección y el número de prendas asociadas a cada tipo  **

```sql
# Consulta realizada ....
```

**23 Mostrar la lista de empleados con sus cargos y fechas de ingreso ordenados por la fecha de ingreso de manera descendente  **

```sql
# Consulta realizada ....
```

**24 Mostrar el nombre y la descripción de todos los cargos junto con la cantidad de empleados en cada cargo  **

```sql
# Consulta realizada ....
```

**25 Obtener el nombre y la descripción de los estados junto con la cantidad de prendas asociadas a cada estado  **

```sql
# Consulta realizada ....
```

**26 Obtener el nombre y la descripción de los tipos de persona junto con la cantidad de clientes asociados a cada tipo  **

```sql
# Consulta realizada ....
```

**27 Mostrar el nombre y la descripción de los tipos de protección junto con la cantidad de prendas asociadas a cada tipo  **

```sql
# Consulta realizada ....
```

**28 Obtener el nombre y la descripción de los estados junto con la cantidad de órdenes asociadas a cada estado  **

```sql
# Consulta realizada ....
```

**29 Obtener el nombre y la descripción de los tipos de pago junto con la cantidad de ventas asociadas a cada tipo  **

```sql
# Consulta realizada ....
```

**30 Mostrar el nombre y la descripción de los tipos de insumos junto con la cantidad de prendas que los utilizan **

```sql
# Consulta realizada ....
```

**31 Obtener el nombre de los clientes y la cantidad total gastada por cada uno en ventas **

```sql
# Consulta realizada ....
```

**32 Mostrar el nombre y la descripción de las prendas junto con el valor total de ventas en pesos colombianos para cada una **

```sql
# Consulta realizada ....
```

**33 Mostrar el nombre y la descripción de los estados junto con la cantidad de prendas asociadas a cada estado en orden ascendente de la cantidad de prendas **

```sql
# Consulta realizada ....
```
