BEGIN;
CREATE TABLE `openFS_users` (
    `id` integer AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `username` varchar(30) NOT NULL,
    `password` varchar(20) NOT NULL
)
;
CREATE TABLE `openFS_user` (
    `id` integer AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `userID` integer NOT NULL,
    `username` varchar(30) NOT NULL,
    `password` varchar(20) NOT NULL,
    `fullname` varchar(30) NOT NULL,
    `email` varchar(75) NOT NULL UNIQUE,
    `sshkey` varchar(300) NOT NULL,
    `groupName` varchar(50) NOT NULL
)
;
CREATE TABLE `openFS_groups` (
    `id` integer AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `groupID` integer NOT NULL,
    `groupName` varchar(50) NOT NULL
)
;

COMMIT;
