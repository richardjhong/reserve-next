import * as jose from 'jose';
import validator from 'validator';

export const assignToken = async (email: string, interaction: string) => {
  const alg = "HS256";
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  const token = await new jose.SignJWT({email})
    .setProtectedHeader({alg})
    .setExpirationTime("2h")
    .sign(secret)

  return {
    status: 200,
    message: interaction === 'register' ? 'Registration successful' : 'Login successful',
    token
  };
};

export const validateInput = async (
  email: string,
  password: string,
  first_name?: string,
  last_name?: string,
  city?: string,
  phone?: string,
) => {
  const errors: string[] = [];

  const validationSchema = [
    {
      valid: validator.isEmail(email),
      errorMessage: "Email is invalid"
    },
    {
      valid: validator.isLength(password, { min: 1}),
      errorMessage: "Password is invalid"
    },
  ];

  first_name && validationSchema.concat([
    {
      valid: validator.isLength(first_name, {
        min: 1,
        max: 20
      }),
      errorMessage: "First name is invalid length, must be between 1 and 20 characters"
    },
    {
      valid: validator.isLength(last_name!, {
        min: 1,
        max: 20
      }),
      errorMessage: "Last name is invalid length, must be between 1 and 20 characters"
    },
    {
      valid: validator.isMobilePhone(phone!),
      errorMessage: "Phone number is invalid"
    },
    {
      valid: validator.isLength(city!, {min: 1}),
      errorMessage: "City is invalid"
    },
  ]);

  validationSchema.forEach((check) => {
    if (!check.valid) {
      errors.push(check.errorMessage);            
    };
  });

  return errors;
}