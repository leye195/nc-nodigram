import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { prisma } from "../generated/prisma-client";
import "./env";

const SECRET = process.env.SECRET_KEY;
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET,
};
const verifyUser = async (payload, done) => {
  try {
    const user = await prisma.user({ id: payload.id });
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (e) {
    return done(e, false);
  }
};

export const authenticateJwt = (req, res, next) =>
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (user) {
      req.user = user;
    }
    next();
  })(req, res, next);

passport.use(new Strategy(jwtOptions, verifyUser));
passport.initialize();
