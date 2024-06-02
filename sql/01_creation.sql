-- This scripts create the dedicated database and its administrator
DROP DATABASE IF EXISTS `muthufy`;

CREATE DATABASE `muthufy`;

USE `muthufy`;

-- Create user for local access
DROP USER IF EXISTS 'muthu' @'localhost';

CREATE USER 'muthu' @'localhost' IDENTIFIED BY 'SuperSuper2024.';

GRANT
Insert
    ON muthufy.* TO 'muthu' @'localhost';

GRANT
Select
    ON muthufy.* TO 'muthu' @'localhost';

GRANT
Update
    ON muthufy.* TO 'muthu' @'localhost';

GRANT Delete ON muthufy.* TO 'muthu' @'localhost';