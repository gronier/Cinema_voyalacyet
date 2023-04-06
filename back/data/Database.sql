DROP TABLE IF EXISTS Role;
DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Film;
DROP TABLE IF EXISTS Salle;
DROP TABLE IF EXISTS Seance;
DROP TABLE IF EXISTS Reservation;

CREATE TABLE Role
(
    id_role integer primary key autoincrement,
    name_role varchar not null,
    unique (name_role)
);
CREATE TABLE User
(
    id_user integer primary key autoincrement,
    nom_user varchar not null,
    prenom_user varchar not null,
    email_user varchar not null,
    password_user varchar not null ,
    id_role integer ,
    unique (email_user),
    FOREIGN KEY (id_role) REFERENCES Role(id_role)
);
CREATE TABLE Film
(
    id_film integer primary key autoincrement,
    nom_film varchar not null,
    affiche varchar not null,
    duree_film varchar not null,
    description_film varchar not null,
    unique (nom_film)
);
CREATE TABLE Salle
(
    id_salle integer primary key autoincrement,
    nom_salle varchar not null,
    nbPlace_salle integer not null,
    unique (nom_salle)

);
CREATE TABLE Seance
(
    id_seance integer primary key autoincrement,


    language_seance varchar not null,
    version_seance varchar not null,
    date_debut_seance datetime not null,
    date_fin_seance datetime not null,
    prix_seance numeric not null ,
    id_film integer not null,


    FOREIGN KEY (id_film) REFERENCES Film(id_film)

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

INSERT INTO Role (name_role) VALUES ('Client'),('Etudiant'),('Employe');
INSERT INTO Film(nom_film, affiche, duree_film, description_film) VALUES ('Mario','https://global-img.gamergen.com/super-mario-bros-le-film-poster-03-02-2023_0901015412.jpg',92,'Film animé mario');
INSERT INTO Salle(nom_salle, nbPlace_salle) VALUES ('test',69);
INSERT INTO Seance(language_seance, version_seance, date_debut_seance, date_fin_seance, prix_seance, id_film) values ('VF','2D','2023-04-05 12:00','2023-04-05 14:00',10,1)

