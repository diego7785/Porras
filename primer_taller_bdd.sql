CREATE TABLE Estudiante(
	codigo VARCHAR(10) NOT NULL,
	nombre VARCHAR(255) NOT NULL,
	plan_academico VARCHAR(255) NOT NULL,
	correo VARCHAR(255) NOT NULL,
	creditos_matriculados INT NOT NULL,
	CONSTRAINT pk_estudiante PRIMARY KEY (codigo)
);

CREATE TABLE Matricula(
	codigo_estudiante VARCHAR(10),
	codigo_curso VARCHAR(10),
	nota INT,
	CONSTRAINT fk_matricula_estudiante FOREIGN KEY (codigo_estudiante) REFERENCES Estudiante ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE Curso(
	codigo VARCHAR(10),
	nombre VARCHAR(255),
	creditos INT,
	CONSTRAINT pk_curso PRIMARY KEY (codigo)
);

CREATE TABLE Prerrequisito(
	codigo_curso VARCHAR(10),
	codigo_prerrequisito VARCHAR(10),
	CONSTRAINT fk_curso FOREIGN KEY (codigo_curso) REFERENCES Curso ON UPDATE RESTRICT ON DELETE RESTRICT,
	CONSTRAINT fk_prerrequisito FOREIGN KEY (codigo_prerrequisito) REFERENCES Curso ON UPDATE RESTRICT ON DELETE RESTRICT
);

CREATE TABLE Periodo_academico(
	dia VARCHAR(20),
	hora_inicio VARCHAR(10),
	hora_fin VARCHAR(10),
	lugar VARCHAR(50),
	CONSTRAINT pk_periodo PRIMARY KEY (dia,hora_inicio, hora_fin, lugar)
);

CREATE TABLE Oferta(
	dia VARCHAR(20),
	hora_inicio VARCHAR(10),
	hora_fin VARCHAR(10),
	lugar VARCHAR(50),
	codigo_curso VARCHAR(10),
	CONSTRAINT pk_oferta PRIMARY KEY (dia, hora_inicio, hora_fin, lugar, codigo_curso),
	CONSTRAINT fk_oferta_periodo FOREIGN KEY (dia, hora_inicio, hora_fin, lugar) REFERENCES Periodo_academico ON UPDATE CASCADE ON DELETE RESTRICT,
	CONSTRAINT fk_oferta_curso FOREIGN KEY (codigo_curso) REFERENCES Curso ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE Profesor(
	id VARCHAR(15),
	nombr VARCHAR(255),
	unidad_academica VARCHAR(255),
	ultimo_titulo VARCHAR(255),
	CONSTRAINT pk_profesor PRIMARY KEY (id)
);

CREATE TABLE Imparte(
	id_profesor VARCHAR(15),
	codigo_curso VARCHAR(255),
	CONSTRAINT pk_imparte PRIMARY KEY (id_profesor, codigo_curso),
	CONSTRAINT fk_imparte_profesor FOREIGN KEY (id_profesor) REFERENCES Profesor ON UPDATE RESTRICT ON DELETE RESTRICT,
	CONSTRAINT fk_imparte_curso FOREIGN KEY (codigo_curso) REFERENCES Curso ON UPDATE RESTRICT ON DELETE RESTRICT
);

