INSERT INTO ciudad(codigo, nombre) VALUES ('2250', 'cali'),('2255', 'Bogota'),('1144', 'Medellin');

INSERT INTO categoria (descripcion) VALUES ('Plastico'),('Vidrio'),('Aluminios');

INSERT INTO proveedor (nit, nombre, telefono) VALUES ('123124444', 'Aluminios cali', '23424323424'),('4243111111', 'plasticos colombia', '52542342432'),('121321', 'vidrios cali', '1231231321');

INSERT INTO producto (cantidad,codigo_producto, id_categoria, precio, id_proveedor, descripcion, nombre) VALUES (100,001, 3, 25000.00, 3, 'Tanque para agua', 'Tanque 10 lts'),(10,002, 1, 2500.00, 1, 'Cucharon para sopa', 'Cucharon #10'),(50,003, 2, 10000.00, 2, 'Jarron de flores', 'Jarron 10 cm');

INSERT INTO cliente (nombre, apellido, id_ciudad) VALUES ('Oscar','ramirez', 1), ('martin','educando', 2);

INSERT INTO usuario (nombre) VALUES ('Julian');

INSERT INTO factura(client_id, total, date, invoice_code, status) VALUES (1,2500,'2024-02-28','112', true);

INSERT INTO itemfactura(id_factura, id_producto) VALUES (1, 1);

CREATE TABLE roles
(
    id          SERIAL PRIMARY KEY,
    descripcion VARCHAR(50) UNIQUE NOT NULL
);
CREATE TABLE usuario_roles
(
    usuario_id INTEGER NOT NULL,
    rol_id     INTEGER NOT NULL,
    PRIMARY KEY (usuario_id, rol_id),
    FOREIGN KEY (usuario_id) REFERENCES usuario (id),
    FOREIGN KEY (rol_id) REFERENCES roles (id)
);

-- Datos de prueba
INSERT INTO roles (descripcion)
VALUES ('ROLE_ADMIN'),
       ('ROLE_USER');
INSERT INTO usuario (login, pass)
VALUES ('admin', '$2a$15$v.U4i22NPHOD4dmCOxf4NesQzrYYj7HeAuCLPuon5a05e91QU9Tr2'); -- Usa BCrypt 112233
INSERT INTO usuario_roles (usuario_id, rol_id)
VALUES (4, 1); -- admin tiene ROLE_ADMIN
