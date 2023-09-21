CREATE TABLE images (
    id INT NOT NULL AUTO_INCREMENT,
    unique_id TEXT,
    data LONGBLOB,
    name TEXT,
    rating BIGINT DEFAULT 1400,
    PRIMARY KEY (id)
)
