/* DROP DATABASE IF EXISTS debatable_db;
CREATE DATABASE debatable_db;

USE debatable_db;

CREATE TABLE users
(
    id INT NOT NULL AUTO_INCREMENT,
    username varchar(50) NOT NULL,
    password varchar(50) NOT NULL,
    wins INT NOT NULL DEFAULT 0,
    losses INT NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE posts
(
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    debate_id INT NOT NULL,
    content varchar(250) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE debates
(
    id INT NOT NULL AUTO_INCREMENT,
    post_id INT NOT NULL,
    user1_id INT NOT NULL,
    user2_id INT NOT NULL,
    topic varchar(100) NOT NULL,
    user1_votes INT NOT NULL,
    user2_votes INT NOT NULL,
    PRIMARY KEY (id)
); */
