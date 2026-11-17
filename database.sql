
CREATE DATABASE IF NOT EXISTS api_express CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE api_express;
CREATE TABLE IF NOT EXISTS usuarios (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL
);
-- Opcional: dados iniciais (executar somente uma vez)
INSERT INTO usuarios (nome) VALUES ('João'), ('Maria');
