DROP TABLE IF EXISTS item;
DROP TABLE IF EXISTS person;
CREATE TABLE person
(
    per_id integer primary key autoincrement,
    per_name varchar not null,
    per_password varchar not null
);
CREATE TABLE item
(
    item_id integer primary key autoincrement,
    item_name varchar not null
);
INSERT INTO item (item_name) VALUES ("pierre"),("ciseaux"),("papier");
INSERT INTO person(per_name,per_password) VALUES ("toto","$2b$10$D9H96iHFqk7q4YsdBxgP.uBeqFdfE0N/h3nR64oIuciuIfN8KaMRO");
