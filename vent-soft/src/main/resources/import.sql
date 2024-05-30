INSERT INTO ciudad(codigo, nombre) VALUES ('2250', 'cali');

INSERT INTO categoria (descripcion) VALUES ('Plastico'),('Vidrio'),('Aluminios');

INSERT INTO proveedor (nit, nombre, telefono) VALUES ('123124444', 'Aluminios cali', '23424323424'),('4243111111', 'plasticos colombia', '52542342432'),('121321', 'vidrios cali', '1231231321');

INSERT INTO producto (cantidad, id_categoria, precio, id_proveedor, descripcion, nombre) VALUES (100, 3, 25000.00, 3, 'Tanque para agua', 'Tanque 10 lts'),(10, 1, 2500.00, 1, 'Cucharon para sopa', 'Cucharon #10'),(50, 2, 10000.00, 2, 'Jarron de flores', 'Jarron 10 cm');

INSERT INTO cliente (name, id_ciudad) VALUES ('Oscar', 1);

INSERT INTO usuario (nombre) VALUES ('Julian');

INSERT INTO itemfactura(item_code, price, stock, product) VALUES (111, 2500, 10, 'product');

INSERT INTO factura(client_id, item_invoice_id, total, date, invoice_code) VALUES (1,1,2500,'28-05-2024','112');
