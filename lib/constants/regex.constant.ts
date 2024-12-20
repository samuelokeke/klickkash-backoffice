export const emailRegEx = new RegExp(/[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/);

export const phoneRegEx = new RegExp(/(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}/);

export const pwdRegExp = new RegExp(
  /(?=(?:.*[A-Z]){1,})(?=(?:.*[a-z]){2,})(?=(?:.*\d{1,}))(?=(?:.*[!@#$%^&*()\-_=+{};:,<.>]){1,})(?!.*(.)\1{2})([A-Za-z0-9!@#$%^&*()\-_=+{};:,<.>]{10,20})/gm
);
