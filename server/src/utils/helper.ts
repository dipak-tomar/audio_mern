export const generateToken = (length: number = 6) => {
  let otp = "";
  for (let i = 0; i < length; i++) {
    let digit = Math.floor(Math.random() * 10);
    otp += digit;
  }
  return otp;
};
