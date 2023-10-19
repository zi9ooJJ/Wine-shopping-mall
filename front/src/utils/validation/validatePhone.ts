const phoneRegex = /^[0-9]{3}-[0-9]{3,4}-[0-9]{4}/;
export function validatePhone(phone: string) {
  return phoneRegex.test(phone);
}
