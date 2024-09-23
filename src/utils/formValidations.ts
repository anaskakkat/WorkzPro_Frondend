// src/utils/formValidations.ts

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passwordRegex = /^(?=\S)(?=\S{8,})/;

export const validateEmail = (email: string) => {
  if (!emailRegex.test(email)) {
    return "Invalid email format";
  }
  return "";
};

export const validatePassword = (password: string) => {
  if (!passwordRegex.test(password)) {
    return "Password must be at least 8 characters.";
  }
  return "";
};
