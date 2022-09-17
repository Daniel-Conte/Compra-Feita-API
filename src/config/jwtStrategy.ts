import {
  Strategy,
  StrategyOptions,
  ExtractJwt,
  VerifiedCallback,
} from "passport-jwt";

import { authSecret } from "@config/index";
import prismaClient from "@database/prismaClient";
import { AuthTokenDecoded } from "@modelTypes/auth";

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: authSecret,
};

const verify = (payload: AuthTokenDecoded, done: VerifiedCallback) => {
  prismaClient.pessoa
    .findFirst({ where: { email: payload.email } })
    .then((user) => {
      if (user) {
        return done(null, payload);
      }
      return done(null, false);
    })
    .catch((err) => done(err, false));
};

export default new Strategy(options, verify);
