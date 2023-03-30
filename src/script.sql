CREATE TABLE `user_types` (
    `id` int NOT NULL AUTO_INCREMENT,
    `key` varchar(50) NOT NULL,
    `name` varchar(500) NOT NULL,
    `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `user_credentials` (
    `id` int NOT NULL AUTO_INCREMENT,
    `email` varchar(100) NOT NULL,
    `password` varchar(100) NOT NULL,
    `user_type_id` int NOT NULL,
    `status` varchar(100) NOT NULL DEFAULT 'inactive',
    `active` tinyint(1) DEFAULT '0',
    `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `iq_email` (`email`),
    KEY `idx_user_type_id` (`user_type_id`)
);

CREATE TABLE `admins` (
    `id` int unsigned NOT NULL AUTO_INCREMENT,
    `user_auth_id` int NOT NULL,
    `name` varchar(255) NOT NULL,
    `phone_number` varchar(255) DEFAULT NULL,
    `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_name` (`name`),
    KEY `idx_user_auth_id` (`user_auth_id`)
);

CREATE TABLE `employees` (
    `id` int unsigned NOT NULL AUTO_INCREMENT,
    `user_auth_id` int NOT NULL,
    `name` varchar(255) NOT NULL,
    `job_title` varchar(255) NULL,
    `phone_number` varchar(255) NULL,
    `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_name` (`name`),
    KEY `idx_user_auth_id` (`user_auth_id`)
);

CREATE TABLE `caterers` (
    `id` int unsigned NOT NULL AUTO_INCREMENT,
    `user_auth_id` int NOT NULL,
    `name` varchar(255) NOT NULL,
    `phone_number` varchar(255) NULL,
    `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_name` (`name`),
    KEY `idx_user_auth_id` (`user_auth_id`)
);

CREATE TABLE `employee_meals` (
    `id` int unsigned NOT NULL AUTO_INCREMENT,
    `employee_id` int unsigned NOT NULL,
    `code` varchar(10) NOT NULL,
    `status` tinyint(1) DEFAULT '0',
    `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_code` (`code`),
    KEY `idx_employee_id` (`employee_id`)
);