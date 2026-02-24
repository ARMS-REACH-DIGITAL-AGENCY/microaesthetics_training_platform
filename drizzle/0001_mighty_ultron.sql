CREATE TABLE `enrollment_pathways` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`pathwayType` enum('full_certification','a_la_carte','individual_chapter') NOT NULL,
	`selectedClasses` text,
	`inquiryMessage` text,
	`status` enum('inquiry','enrolled','completed') NOT NULL DEFAULT 'inquiry',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `enrollment_pathways_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `quiz_attempts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`chapterId` varchar(64) NOT NULL DEFAULT 'chapter_1',
	`score` int NOT NULL,
	`totalQuestions` int NOT NULL,
	`percentageScore` int NOT NULL,
	`passed` int NOT NULL DEFAULT 0,
	`answers` text,
	`attemptNumber` int NOT NULL DEFAULT 1,
	`completedAt` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `quiz_attempts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `student_progress` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`chapterId` varchar(64) NOT NULL DEFAULT 'chapter_1',
	`currentSlide` int NOT NULL DEFAULT 0,
	`totalSlides` int NOT NULL DEFAULT 37,
	`completionPercentage` int NOT NULL DEFAULT 0,
	`lastAccessedAt` timestamp NOT NULL DEFAULT (now()),
	`completedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `student_progress_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `enrollment_pathways` ADD CONSTRAINT `enrollment_pathways_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `quiz_attempts` ADD CONSTRAINT `quiz_attempts_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `student_progress` ADD CONSTRAINT `student_progress_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;