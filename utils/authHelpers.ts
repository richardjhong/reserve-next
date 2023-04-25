import * as jose from 'jose';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const assignToken = async (email: string) => {
  const alg = "HS256";
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  const token = await new jose.SignJWT({email})
    .setProtectedHeader({alg})
    .setExpirationTime("2h")
    .sign(secret)

  return token;
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

  let validationSchema = [
    {
      valid: validator.isEmail(email),
      errorMessage: "Email is invalid"
    },
    {
      valid: first_name ? validator.isStrongPassword(password) : validator.isLength(password, { min: 1}),
      errorMessage: "Password is invalid"
    },
  ];

  if (first_name) {
      const registrationExtraValidation = [
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
      }
    ];

    validationSchema = [...validationSchema, ...registrationExtraValidation]
  }

  validationSchema.forEach((check) => {
    if (!check.valid) {
      errors.push(check.errorMessage);            
    };
  });

  return errors;
}

export const authorizedUser = async (bearerToken: string) => {
  const token = bearerToken.split(' ')[1];
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  await jose.jwtVerify(token, secret);

  const payload = jwt.decode(token) as {email: string};

  const user = await prisma.user.findUnique({
    where: {
      email: payload.email
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      city: true
    }
  });  

  return user!;
}