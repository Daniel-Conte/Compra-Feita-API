import validateEmail from "@utils/validateEmail";

describe("Valida E-mail", () => {
  it("Válido - mysite@ourearth.com", () => {
    expect(validateEmail("mysite@ourearth.com")).toBeTruthy();
  });
  it("Válido - my.ownsite@ourearth.org", () => {
    expect(validateEmail("my.ownsite@ourearth.org")).toBeTruthy();
  });
  it("Válido - mysite@you.me.net", () => {
    expect(validateEmail("mysite@you.me.net")).toBeTruthy();
  });

  it("Inválido - mysite.ourearth.com", () => {
    expect(validateEmail("mysite.ourearth.com")).toBeFalsy();
  });
  it("Inválido - mysite@.com.my", () => {
    expect(validateEmail("mysite@.com.my")).toBeFalsy();
  });
  it("Inválido - @you.me.net", () => {
    expect(validateEmail("@you.me.net")).toBeFalsy();
  });
  it("Inválido - mysite123@gmail.b", () => {
    expect(validateEmail("mysite123@gmail.b")).toBeFalsy();
  });
  it("Inválido - mysite@.org.org", () => {
    expect(validateEmail("mysite@.org.org")).toBeFalsy();
  });
  it("Inválido - .mysite@mysite.org", () => {
    expect(validateEmail(".mysite@mysite.org")).toBeFalsy();
  });
  it("Inválido - mysite()*@gmail.com", () => {
    expect(validateEmail("mysite()*@gmail.com")).toBeFalsy();
  });
  it("Inválido - mysite..1234@yahoo.com", () => {
    expect(validateEmail("mysite..1234@yahoo.com")).toBeFalsy();
  });
});
