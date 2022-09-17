import passport from "passport";

const jwtAuthenticator = (...args: any) =>
  passport.authenticate("jwt", { session: false })(...args);

export default jwtAuthenticator;
