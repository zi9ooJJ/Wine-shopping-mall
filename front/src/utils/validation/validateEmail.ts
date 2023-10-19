const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export function validateEmail(email: string) {
  return emailRegex.test(email);
}
