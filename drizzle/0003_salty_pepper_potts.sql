CREATE TABLE `exam_attempts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`chapterId` varchar(64) NOT NULL DEFAULT 'chapter_1',
	`attemptNumber` int NOT NULL DEFAULT 1,
	`startTime` timestamp NOT NULL,
	`endTime` timestamp,
	`durationSeconds` int,
	`score` int,
	`totalQuestions` int NOT NULL,
	`passingScore` int NOT NULL DEFAULT 80,
	`passed` int NOT NULL DEFAULT 0,
	`answers` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `exam_attempts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `slide_progress` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`chapterId` varchar(64) NOT NULL DEFAULT 'chapter_1',
	`slideNumber` int NOT NULL,
	`audioLengthSeconds` int NOT NULL,
	`timeSpentSeconds` int NOT NULL DEFAULT 0,
	`audioPlayed` int NOT NULL DEFAULT 0,
	`audioFinished` int NOT NULL DEFAULT 0,
	`completedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `slide_progress_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `student_profiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`firstName` varchar(255) NOT NULL,
	`lastName` varchar(255) NOT NULL,
	`middleName` varchar(255),
	`email` varchar(320) NOT NULL,
	`phone` varchar(20) NOT NULL,
	`dateOfBirth` varchar(10),
	`socialSecurityNumber` varchar(11),
	`driverLicenseNumber` varchar(20),
	`driverLicenseState` varchar(2),
	`mailingAddress` varchar(500),
	`mailingCity` varchar(100),
	`mailingState` varchar(2),
	`mailingZip` varchar(10),
	`professionalLicenseType` varchar(100),
	`professionalLicenseNumber` varchar(50),
	`professionalLicenseState` varchar(2),
	`emergencyContactName` varchar(255),
	`emergencyContactPhone` varchar(20),
	`enrollmentPathway` enum('certification','license','franchise','free') NOT NULL DEFAULT 'free',
	`enrollmentDate` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `student_profiles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `training_sessions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`chapterId` varchar(64) NOT NULL DEFAULT 'chapter_1',
	`loginTimestamp` timestamp NOT NULL,
	`logoutTimestamp` timestamp,
	`totalSessionTimeSeconds` int DEFAULT 0,
	`sessionStatus` enum('active','completed','abandoned') NOT NULL DEFAULT 'active',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `training_sessions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `exam_attempts` ADD CONSTRAINT `exam_attempts_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `slide_progress` ADD CONSTRAINT `slide_progress_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `student_profiles` ADD CONSTRAINT `student_profiles_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `training_sessions` ADD CONSTRAINT `training_sessions_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;