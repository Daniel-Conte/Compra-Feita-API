import bcrypt from "bcrypt-nodejs";

import IPasswordProvider from "./IPasswordProvider";

class PasswordProviderBCrypt implements IPasswordProvider {
  encryptPassword(password: string): string {
    const salt = bcrypt.genSaltSync(10);

    return bcrypt.hashSync(password, salt);
  }

  comparePasswords(password: string, encryptedPassword: string): boolean {
    return bcrypt.compareSync(password, encryptedPassword);
  }
}

export default PasswordProviderBCrypt;
