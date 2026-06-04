CREATE TABLE `h5n1_map_outbreaks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`country` varchar(100) NOT NULL,
	`date` varchar(10) NOT NULL,
	`cases` int DEFAULT 0,
	`latitude` varchar(20) NOT NULL,
	`longitude` varchar(20) NOT NULL,
	`intensity` int NOT NULL,
	`species` varchar(200),
	`outbreak_type` varchar(50) NOT NULL,
	`source` varchar(200),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `h5n1_map_outbreaks_id` PRIMARY KEY(`id`)
);
