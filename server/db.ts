import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, studentProgress, quizAttempts, enrollmentPathways, leads } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

/**
 * Get or create student progress for a chapter
 */
export async function getOrCreateStudentProgress(userId: number, chapterId: string = "chapter_1") {
  const db = await getDb();
  if (!db) return null;

  const existing = await db
    .select()
    .from(studentProgress)
    .where(eq(studentProgress.userId, userId))
    .limit(1);

  if (existing.length > 0) {
    return existing[0];
  }

  // Create new progress record
  await db.insert(studentProgress).values({
    userId,
    chapterId,
    currentSlide: 0,
    totalSlides: 37,
    completionPercentage: 0,
  });

  return (await db.select().from(studentProgress).where(eq(studentProgress.userId, userId)).limit(1))[0];
}

/**
 * Update student progress
 */
export async function updateStudentProgress(
  userId: number,
  currentSlide: number,
  chapterId: string = "chapter_1"
) {
  const db = await getDb();
  if (!db) return null;

  const completionPercentage = Math.round((currentSlide / 37) * 100);

  await db
    .update(studentProgress)
    .set({
      currentSlide,
      completionPercentage,
      lastAccessedAt: new Date(),
    })
    .where(eq(studentProgress.userId, userId));

  return (await db.select().from(studentProgress).where(eq(studentProgress.userId, userId)).limit(1))[0];
}

/**
 * Record quiz attempt
 */
export async function recordQuizAttempt(
  userId: number,
  score: number,
  totalQuestions: number,
  answers: Record<string, string>,
  chapterId: string = "chapter_1"
) {
  const db = await getDb();
  if (!db) return null;

  const percentageScore = Math.round((score / totalQuestions) * 100);
  const passed = percentageScore >= 80 ? 1 : 0;

  // Get attempt number
  const previousAttempts = await db
    .select()
    .from(quizAttempts)
    .where(eq(quizAttempts.userId, userId));

  const attemptNumber = previousAttempts.length + 1;

  const result = await db.insert(quizAttempts).values({
    userId,
    chapterId,
    score,
    totalQuestions,
    percentageScore,
    passed,
    answers: JSON.stringify(answers),
    attemptNumber,
  });

  return {
    score,
    totalQuestions,
    percentageScore,
    passed: passed === 1,
    attemptNumber,
  };
}

/**
 * Get latest quiz attempt for user
 */
export async function getLatestQuizAttempt(userId: number, chapterId: string = "chapter_1") {
  const db = await getDb();
  if (!db) return null;

  const attempts = await db
    .select()
    .from(quizAttempts)
    .where(eq(quizAttempts.userId, userId))
    .orderBy((t) => t.createdAt);

  return attempts.length > 0 ? attempts[attempts.length - 1] : null;
}

/**
 * Record enrollment pathway selection
 */
export async function recordEnrollmentPathway(
  userId: number,
  pathwayType: "full_certification" | "a_la_carte" | "individual_chapter",
  selectedClasses?: string[],
  inquiryMessage?: string
) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.insert(enrollmentPathways).values({
    userId,
    pathwayType,
    selectedClasses: selectedClasses ? JSON.stringify(selectedClasses) : null,
    inquiryMessage,
    status: "inquiry",
  });

  return result;
}

/**
 * Create a new lead or return existing one if email already exists
 */
export async function createLead(name: string, email: string) {
  const db = await getDb();
  if (!db) return null;

  try {
    // Check if lead already exists
    const existingLead = await db
      .select()
      .from(leads)
      .where(eq(leads.email, email))
      .limit(1);

    if (existingLead.length > 0) {
      // Return existing access token
      return { accessToken: existingLead[0].accessToken, email };
    }

    // Generate a unique access token
    const accessToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    await db.insert(leads).values({
      name,
      email,
      accessToken,
    });

    return { accessToken, email };
  } catch (error) {
    console.error("[Database] Failed to create lead:", error);
    throw error;
  }
}

/**
 * Get lead by access token
 */
export async function getLeadByAccessToken(accessToken: string) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select().from(leads).where(eq(leads.accessToken, accessToken)).limit(1);

  return result.length > 0 ? result[0] : null;
}

/**
 * Update lead access status
 */
export async function updateLeadAccessStatus(accessToken: string) {
  const db = await getDb();
  if (!db) return null;

  await db
    .update(leads)
    .set({ hasAccessedChapter1: 1 })
    .where(eq(leads.accessToken, accessToken));

  return true;
}

// TODO: add more feature queries here as your schema grows.
