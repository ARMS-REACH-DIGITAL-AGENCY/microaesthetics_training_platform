import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import {
  getOrCreateStudentProgress,
  updateStudentProgress,
  recordQuizAttempt,
  getLatestQuizAttempt,
  recordEnrollmentPathway,
  createLead,
  getLeadByAccessToken,
  updateLeadAccessStatus,
} from "./db";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  progress: router({
    get: protectedProcedure.query(async ({ ctx }) => {
      return getOrCreateStudentProgress(ctx.user.id);
    }),
    update: protectedProcedure
      .input(z.object({ currentSlide: z.number() }))
      .mutation(async ({ ctx, input }) => {
        return updateStudentProgress(ctx.user.id, input.currentSlide);
      }),
  }),
  quiz: router({
    submit: protectedProcedure
      .input(
        z.object({
          score: z.number(),
          totalQuestions: z.number(),
          answers: z.record(z.string(), z.string()),
        })
      )
      .mutation(async ({ ctx, input }) => {
        return recordQuizAttempt(ctx.user.id, input.score, input.totalQuestions, input.answers);
      }),
    getLatest: protectedProcedure.query(async ({ ctx }) => {
      return getLatestQuizAttempt(ctx.user.id);
    }),
  }),
  enrollment: router({
    recordPathway: protectedProcedure
      .input(
        z.object({
          pathwayType: z.enum(["full_certification", "a_la_carte", "individual_chapter"]),
          selectedClasses: z.array(z.string()).optional(),
          inquiryMessage: z.string().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        return recordEnrollmentPathway(
          ctx.user.id,
          input.pathwayType,
          input.selectedClasses,
          input.inquiryMessage
        );
      }),
  }),
  leads: router({
    capture: publicProcedure
      .input(
        z.object({
          name: z.string().min(1),
          email: z.string().email(),
        })
      )
      .mutation(async ({ input }) => {
        return createLead(input.name, input.email);
      }),
    verify: publicProcedure
      .input(z.object({ accessToken: z.string() }))
      .query(async ({ input }) => {
        return getLeadByAccessToken(input.accessToken);
      }),
    markAccessed: publicProcedure
      .input(z.object({ accessToken: z.string() }))
      .mutation(async ({ input }) => {
        return updateLeadAccessStatus(input.accessToken);
      }),
  }),
});

export type AppRouter = typeof appRouter;
