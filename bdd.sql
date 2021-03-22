CREATE TABLE Person(
    id VARCHAR(10), 
    name VARCHAR(255), 
    email VARCHAR(255), 
    password VARCHAR(255), 
    CONSTRAINT Pk_user PRIMARY KEY(id));

CREATE TABLE Token (
    token VARCHAR(255), 
    id_person VARCHAR(10), 
    CONSTRAINT pk_token PRIMARY KEY (token), 
    CONSTRAINT fk_person_token FOREIGN KEY (id_person) REFERENCES Person(id) )
