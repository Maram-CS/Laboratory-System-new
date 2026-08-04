CREATE DATABASE IF NOT EXISTS laboratory_system
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE laboratory_system;

CREATE TABLE IF NOT EXISTS lab_info (
  id INT AUTO_INCREMENT PRIMARY KEY,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  address VARCHAR(500) NOT NULL,
  opening_hours VARCHAR(255) NOT NULL,
  map_query VARCHAR(500) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO lab_info (phone, email, address, opening_hours, map_query)
SELECT '+213 555 000 000',
       'contact@biolab.test',
       'Setif, Algeria',
       'Sunday - Thursday, 8:00 - 17:00',
       'BioLab Diagnostics Setif Algeria'
WHERE NOT EXISTS (SELECT 1 FROM lab_info);
