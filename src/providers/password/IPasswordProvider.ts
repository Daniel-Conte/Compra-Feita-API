export default interface IPasswordProvider {
  encryptPassword(password: string): string;
  comparePasswords(password: string, encryptedPassword: string): boolean;
}
