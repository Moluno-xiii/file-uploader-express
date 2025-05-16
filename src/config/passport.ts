import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import prisma from "..";
import bcrypt from "bcryptjs";

export function initializePassport() {
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      async (email: string, password: string, callback) => {
        try {
          const user = await prisma.users.findUnique({
            where: {
              email,
            },
          });
          if (!user) {
            return callback(null, false, {
              message: "Incorrect username or password",
            });
          }

          const isMatch = await bcrypt.compare(password, user.hashed_password);
          if (!isMatch)
            return callback(null, false, {
              message: "Incorrect username or password",
            });

          return callback(null, user);
        } catch (err: unknown) {
          const message =
            err instanceof Error ? err.message : "An unexpected error occured";
          return callback(err);
        }
      }
    )
  );

  passport.serializeUser((user: any, callback) => {
    callback(null, { id: user.id });
  });

  passport.deserializeUser(async (userId: { id: number }, callback) => {
    try {
      const user = await prisma.users.findUnique({
        where: {
          id: userId.id,
        },
      });
      callback(null, user);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "An unexpected error occured";
      return callback(err);
    }
  });
}
