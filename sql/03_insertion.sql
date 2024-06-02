-- Création de la base de données
CREATE DATABASE IF NOT EXISTS muthufy;

USE muthufy;

-- Création de la table des artistes
CREATE TABLE IF NOT EXISTS artists (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    profile_photo VARCHAR(255)
);

-- Création de la table des pistes
CREATE TABLE IF NOT EXISTS tracks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    url VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    tags VARCHAR(255),
    cover VARCHAR(255),
    artist_id INT,
    FOREIGN KEY (artist_id) REFERENCES artists(id)
);

-- Création de la table de jointure pour les collaborations
CREATE TABLE IF NOT EXISTS track_collaborators (
    track_id INT,
    artist_id INT,
    PRIMARY KEY (track_id, artist_id),
    FOREIGN KEY (track_id) REFERENCES tracks(id),
    FOREIGN KEY (artist_id) REFERENCES artists(id)
);

-- Création de la table des albums
CREATE TABLE IF NOT EXISTS albums (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    number_of_tracks INT NOT NULL,
    cover VARCHAR(255),
    artist_id INT,
    FOREIGN KEY (artist_id) REFERENCES artists(id)
);

-- Création de la table de jointure pour les artistes des albums
CREATE TABLE IF NOT EXISTS album_artists (
    album_id INT,
    artist_id INT,
    PRIMARY KEY (album_id, artist_id),
    FOREIGN KEY (album_id) REFERENCES albums(id),
    FOREIGN KEY (artist_id) REFERENCES artists(id)
);

-- Création de la table de jointure pour les pistes des albums
CREATE TABLE IF NOT EXISTS album_tracks (
    album_id INT,
    track_id INT,
    PRIMARY KEY (album_id, track_id),
    FOREIGN KEY (album_id) REFERENCES albums(id),
    FOREIGN KEY (track_id) REFERENCES tracks(id)
);

-- Insertion des données dans la table des artistes
INSERT INTO artists (name, profile_photo) VALUES
    ('Nihno', 'http://localhost:5173/public/covers/artist/nihno.jpg'),
    ('PNL', 'http://localhost:5173/public/covers/artist/pnl.jpg'),
    ('Iss', 'http://localhost:5173/public/covers/artist/iss.jpg'),
    ('Central cee', 'http://localhost:5173/public/covers/artist/central_cee.jpg'),
    ('Timal', 'http://localhost:5173/public/covers/artist/timal.jpg'),
    ('Gazo', 'http://localhost:5173/public/covers/artist/gazo.jpg'),
    ('Lil Baby', 'http://localhost:5173/public/covers/artist/lil_baby.jpg'),
    ('Koba la D', 'http://localhost:5173/public/covers/artist/koba_la_d.jpg');

-- Insertion des données dans la table des pistes
INSERT INTO tracks (url, title, tags, artist_id, cover) VALUES
    ('http://localhost:5173/public/songs/v2v.mp3', 'Vrai de vrai', 'Rap', (SELECT id FROM artists WHERE name = 'Nihno'), 'http://localhost:5173/public/covers/v2v.jpg'),
    ('http://localhost:5173/public/songs/MOWGLI.mp3', 'Mowgli', 'Rap', (SELECT id FROM artists WHERE name = 'PNL'), 'http://localhost:5173/public/covers/MOWGLI.jpg'),
    ('http://localhost:5173/public/songs/salvatore.mp3', 'Salvatore', 'hardcore', (SELECT id FROM artists WHERE name = 'Iss'), 'http://localhost:5173/public/covers/salvatore.jpg'),
    ('http://localhost:5173/public/songs/band4band.mp3', 'band4band', 'Rap', (SELECT id FROM artists WHERE name = 'Central cee'), 'http://localhost:5173/public/covers/band4band.jpg'),
    ('http://localhost:5173/public/songs/vatos.mp3', 'Vatos', 'Rap', (SELECT id FROM artists WHERE name = 'Timal'), 'http://localhost:5173/public/covers/vatos.jpg'),
    ('http://localhost:5173/public/songs/filtre.mp3', 'Filtré', 'Rap', (SELECT id FROM artists WHERE name = 'Timal'), 'http://localhost:5173/public/covers/filtre.jpg');
    ('http://localhost:5173/public/songs/rr_phantom.mp3', 'RR Phantom', 'Rap', (SELECT id FROM artists WHERE name = 'Timal'), 'http://localhost:5173/public/covers/album/darzava.jpg');
    ('http://localhost:5173/public/songs/glock9.mp3', 'Glock 9', 'Rap', (SELECT id FROM artists WHERE name = 'Timal'), 'http://localhost:5173/public/covers/album/darzava.jpg');
    ('http://localhost:5173/public/songs/paris.mp3', 'Paris', 'Rap', (SELECT id FROM artists WHERE name = 'Timal'), 'http://localhost:5173/public/covers/album/darzava.jpg');
    ('http://localhost:5173/public/songs/enzo.mp3', 'Enzo', 'Rap', (SELECT id FROM artists WHERE name = 'Timal'), 'http://localhost:5173/public/covers/album/darzava.jpg');
    ('http://localhost:5173/public/songs/ounahi.mp3', 'Ounahi', 'Rap', (SELECT id FROM artists WHERE name = 'Timal'), 'http://localhost:5173/public/covers/album/darzava.jpg');
    ('http://localhost:5173/public/songs/piste_brouille.mp3', 'Piste brouillée', 'Rap', (SELECT id FROM artists WHERE name = 'Timal'), 'http://localhost:5173/public/covers/album/darzava.jpg');

-- Insertion des collaborations dans la table de jointure
INSERT INTO track_collaborators (track_id, artist_id) VALUES
    ((SELECT id FROM tracks WHERE title = 'band4band'), (SELECT id FROM artists WHERE name = 'Central cee')),
    ((SELECT id FROM tracks WHERE title = 'band4band'), (SELECT id FROM artists WHERE name = 'Lil Baby')),
    ((SELECT id FROM tracks WHERE title = 'Filtré'), (SELECT id FROM artists WHERE name = 'Timal')),
    ((SELECT id FROM tracks WHERE title = 'Filtré'), (SELECT id FROM artists WHERE name = 'Gazo'));

-- Insertion des données dans la table des albums
INSERT INTO albums (name, number_of_tracks, cover, artist_id) VALUES
    ('Darzava', 6, 'http://localhost:5173/public/covers/album/darzava.jpg', (SELECT id FROM artists WHERE name = 'Timal'));

-- Insertion des artistes dans la table de jointure des artistes des albums
INSERT INTO album_artists (album_id, artist_id) VALUES
    ((SELECT id FROM albums WHERE name = 'Darzava'), (SELECT id FROM artists WHERE name = 'Timal'));

-- Insertion des pistes dans la table de jointure des pistes des albums
INSERT INTO album_tracks (album_id, track_id) VALUES
    ((SELECT id FROM albums WHERE name = 'Darzava'), (SELECT id FROM tracks WHERE title = 'RR Phantom')),
    ((SELECT id FROM albums WHERE name = 'Darzava'), (SELECT id FROM tracks WHERE title = 'Glock 9')),
    ((SELECT id FROM albums WHERE name = 'Darzava'), (SELECT id FROM tracks WHERE title = 'Paris')),
    ((SELECT id FROM albums WHERE name = 'Darzava'), (SELECT id FROM tracks WHERE title = 'Enzo')),
    ((SELECT id FROM albums WHERE name = 'Darzava'), (SELECT id FROM tracks WHERE title = 'Ounahi')),
    ((SELECT id FROM albums WHERE name = 'Darzava'), (SELECT id FROM tracks WHERE title = 'Piste brouillée'));
