-- Création de la table artists
CREATE TABLE artists (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Création de la table tracks
CREATE TABLE tracks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    url VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    tags VARCHAR(255),
    artist_id INT,
    cover VARCHAR(255),
    CONSTRAINT fk_artist FOREIGN KEY (artist_id) REFERENCES artists(id)
);

