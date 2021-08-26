CREATE TABLE Departamentos(cod_dpto SERIAL PRIMARY KEY,
						  nombre_dpto TEXT);

CREATE TABLE Municipios(cod_municipio SERIAL PRIMARY KEY,
						nom_municipio TEXT,
						cod_dpto_fk INT REFERENCES Departamentos(cod_dpto));


INSERT INTO Departamentos(nombre_dpto) VALUES('Cauca'),
											 ('Valle del Cauca'),
											 ('Santander'),
											 ('Cundinamarca');

INSERT INTO Municipios(nom_municipio, cod_dpto_fk) VALUES('Cali', 2),
														 ('Bucaramanga', 3),
														 ('Jamundi', 2),
														 ('Bolivar', 1),
														 ('Bolivar', 2),
														 ('Bolivar', 3),
														 ('Santander de Quilichao', 1),
														 ('Popayan', 1),
														 ('Palmira', 2),
														 ('Pradera', 2),
														 ('Bogota', 4),
														 ('Cabrera', 4),
														 ('Cabrera', 3);


--###################################


CREATE TABLE Pecuarios(id_peq SERIAL PRIMARY KEY,
					  machos_muertos INT,
					  hembras_muertas INT);


CREATE TABLE Novedad(id_novedad SERIAL PRIMARY KEY,
					fecha_novedad DATE,
					id_peq_fk INT REFERENCES Pecuarios(id_peq));


INSERT INTO Pecuarios(machos_muertos, hembras_muertas) VALUES(23,34),
															 (12,3),
															 (45,25),
															 (345,85),
															 (43,24),
															 (873,29),
															 (892,2398),
															 (154, 8),
															 (23,56);


INSERT INTO Novedad(fecha_novedad, id_peq_fk) VALUES('2021-03-25', 1),
													('2021-03-31', 2),
													('2021-05-01',3),
													('2021-05-17',4),
													('2021-05-28',5),
													('2021-06-03',6),
													('2021-07-15',7),
													('2021-08-08',8),
													('2020-12-21', 9);



--###################################


CREATE TABLE Ganado(id_ganado SERIAL PRIMARY KEY,
					especie TEXT,
					 TEXT,
					peso INTEGER);

INSERT INTO Ganado(especie, lugar_residencia, peso) VALUES('Cebu', 'Granja', 350),
											  ('Cebu', 'Casa', 873),
											  ('Cebu', 'Gran finca', 783),
											  ('Suiza', 'Casa', 635),
											  ('Suiza', 'Granja', 876),
											  ('Jersey', 'Granja', 574),
											  ('Brahman', 'Gran finca', 834),
											  ('Brahman', 'Casa', 234);



									


