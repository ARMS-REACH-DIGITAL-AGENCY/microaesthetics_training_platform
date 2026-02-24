import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Student progress tracking for Chapter 1 training module
 */
export const studentProgress = mysqlTable("student_progress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  chapterId: varchar("chapterId", { length: 64 }).notNull().default("chapter_1"),
  currentSlide: int("currentSlide").notNull().default(0),
  totalSlides: int("totalSlides").notNull().default(37),
  completionPercentage: int("completionPercentage").notNull().default(0),
  lastAccessedAt: timestamp("lastAccessedAt").defaultNow().notNull(),
  completedAt: timestamp("completedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type StudentProgress = typeof studentProgress.$inferSelect;
export type InsertStudentProgress = typeof studentProgress.$inferInsert;

/**
 * Quiz attempts and results tracking
 */
export const quizAttempts = mysqlTable("quiz_attempts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  chapterId: varchar("chapterId", { length: 64 }).notNull().default("chapter_1"),
  score: int("score").notNull(),
  totalQuestions: int("totalQuestions").notNull(),
  percentageScore: int("percentageScore").notNull(),
  passed: int("passed").notNull().default(0), // 0 = false, 1 = true
  answers: text("answers"), // JSON string of user answers
  attemptNumber: int("attemptNumber").notNull().default(1),
  completedAt: timestamp("completedAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type QuizAttempt = typeof quizAttempts.$inferSelect;
export type InsertQuizAttempt = typeof quizAttempts.$inferInsert;

/**
 * Enrollment pathway selections
 */
export const enrollmentPathways = mysqlTable("enrollment_pathways", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  pathwayType: mysqlEnum("pathwayType", ["full_certification", "a_la_carte", "individual_chapter"]).notNull(),
  selectedClasses: text("selectedClasses"), // JSON array of selected class IDs (for a_la_carte)
  inquiryMessage: text("inquiryMessage"),
  status: mysqlEnum("status", ["inquiry", "enrolled", "completed"]).default("inquiry").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type EnrollmentPathway = typeof enrollmentPathways.$inferSelect;
export type InsertEnrollmentPathway = typeof enrollmentPathways.$inferInsert;

/**
 * Lead capture for free Chapter 1 access
 */
export const leads = mysqlTable("leads", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  accessToken: varchar("accessToken", { length: 64 }).notNull().unique(),
  hasAccessedChapter1: int("hasAccessedChapter1").notNull().default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Lead = typeof leads.$inferSelect;
export type InsertLead = typeof leads.$inferInsert;
/**
 * Student profile with enrollment agreement data
 */
export const studentProfiles = mysqlTable("student_profiles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  firstName: varchar("firstName", { length: 255 }).notNull(),
  lastName: varchar("lastName", { length: 255 }).notNull(),
  middleName: varchar("middleName", { length: 255 }),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  dateOfBirth: varchar("dateOfBirth", { length: 10 }),
  socialSecurityNumber: varchar("socialSecurityNumber", { length: 11 }),
  driverLicenseNumber: varchar("driverLicenseNumber", { length: 20 }),
  driverLicenseState: varchar("driverLicenseState", { length: 2 }),
  mailingAddress: varchar("mailingAddress", { length: 500 }),
  mailingCity: varchar("mailingCity", { length: 100 }),
  mailingState: varchar("mailingState", { length: 2 }),
  mailingZip: varchar("mailingZip", { length: 10 }),
  professionalLicenseType: varchar("professionalLicenseType", { length: 100 }),
  professionalLicenseNumber: varchar("professionalLicenseNumber", { length: 50 }),
  professionalLicenseState: varchar("professionalLicenseState", { length: 2 }),
  emergencyContactName: varchar("emergencyContactName", { length: 255 }),
  emergencyContactPhone: varchar("emergencyContactPhone", { length: 20 }),
  enrollmentPathway: mysqlEnum("enrollmentPathway", ["certification", "license", "franchise", "free"]).default("free").notNull(),
  enrollmentDate: timestamp("enrollmentDate"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type StudentProfile = typeof studentProfiles.$inferSelect;
export type InsertStudentProfile = typeof studentProfiles.$inferInsert;

/**
 * Training session tracking (login/logout timestamps)
 */
export const trainingSessions = mysqlTable("training_sessions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  chapterId: varchar("chapterId", { length: 64 }).notNull().default("chapter_1"),
  loginTimestamp: timestamp("loginTimestamp").notNull(),
  logoutTimestamp: timestamp("logoutTimestamp"),
  totalSessionTimeSeconds: int("totalSessionTimeSeconds").default(0),
  sessionStatus: mysqlEnum("sessionStatus", ["active", "completed", "abandoned"]).default("active").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type TrainingSession = typeof trainingSessions.$inferSelect;
export type InsertTrainingSession = typeof trainingSessions.$inferInsert;

/**
 * Slide-level progress tracking
 */
export const slideProgress = mysqlTable("slide_progress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  chapterId: varchar("chapterId", { length: 64 }).notNull().default("chapter_1"),
  slideNumber: int("slideNumber").notNull(),
  audioLengthSeconds: int("audioLengthSeconds").notNull(),
  timeSpentSeconds: int("timeSpentSeconds").notNull().default(0),
  audioPlayed: int("audioPlayed").notNull().default(0),
  audioFinished: int("audioFinished").notNull().default(0),
  completedAt: timestamp("completedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SlideProgress = typeof slideProgress.$inferSelect;
export type InsertSlideProgress = typeof slideProgress.$inferInsert;

/**
 * Exam attempts with detailed tracking
 */
export const examAttempts = mysqlTable("exam_attempts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  chapterId: varchar("chapterId", { length: 64 }).notNull().default("chapter_1"),
  attemptNumber: int("attemptNumber").notNull().default(1),
  startTime: timestamp("startTime").notNull(),
  endTime: timestamp("endTime"),
  durationSeconds: int("durationSeconds"),
  score: int("score"),
  totalQuestions: int("totalQuestions").notNull(),
  passingScore: int("passingScore").notNull().default(80),
  passed: int("passed").notNull().default(0),
  answers: text("answers"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ExamAttempt = typeof examAttempts.$inferSelect;
export type InsertExamAttempt = typeof examAttempts.$inferInsert;
