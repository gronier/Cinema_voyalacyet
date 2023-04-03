DROP TABLE IF EXISTS Role;
DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Film;
DROP TABLE IF EXISTS Salle;

CREATE TABLE Role
(
    id_role integer primary key autoincrement,
    name_role varchar not null
);
CREATE TABLE User
(
    id_user integer primary key autoincrement,
    nom_user varchar not null,
    prenom_user varchar not null,
    email_user varchar not null,
    password_user varchar not null ,
    id_role integer ,
    FOREIGN KEY (id_role) REFERENCES Role(id_role)
);
CREATE TABLE Film
(
    id_film integer primary key autoincrement,
    nom_film varchar not null,
    affiche varchar not null,
    duree_film varchar not null,
    description_film varchar not null
);
CREATE TABLE Salle
(
    id_salle integer primary key autoincrement,
    nom_salle varchar not null,
    nbPlace_salle integer not null,
);
CREATE TABLE Seance
(
    id_seance integer primary key autoincrement,
    language_seance varchar not null,
    version_seance varchar not null,
    date_seance date not null,
    prix_seance nu not null ,
    id_film integer not null,
    duree_seance varchar not null ,
    FOREIGN KEY (id_film) REFERENCES Film(id_film),
    FOREIGN KEY (duree_seance) REFERENCES Film(duree_film)

);
CREATE TABLE Reservation
(
    id_reservation integer primary key autoincrement,
    id_user integer not null ,
    nb_place integer,
    id_seance decimal(10,2) not null ,
    FOREIGN KEY (id_user) REFERENCES User(id_user),
    FOREIGN KEY (id_seance) REFERENCES Seance(id_seance)
);
INSERT INTO Role (name_role) VALUES ('Client'),('Etudiant'),('Employer');
-- INSERT INTO person(per_name,per_password) VALUES ("toto","$2b$10$D9H96iHFqk7q4YsdBxgP.uBeqFdfE0N/h3nR64oIuciuIfN8KaMRO");
