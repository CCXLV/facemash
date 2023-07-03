CREATE TABLE `images` (
    `id` int NOT NULL AUTO_INCREMENT,
    `unique_id` text COLLATE utf8mb4_unicode_ci,
    `data` longblob,
    `name` text COLLATE utf8mb4_unicode_ci,
    `rating` bigint DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci