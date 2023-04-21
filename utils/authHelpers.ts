import * as jose from 'jose';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
  if (!bearerToken) 
  return { 
    status: 401, 
    message: 'You must be logged in',
    type: 'Error'
  };

  const token = bearerToken.split(' ')[1];

  if (!token) {
    return {
      status: 401,
      message: 'Unauthorized request',
      type: 'Error'
    }
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  try {
    await jose.jwtVerify(token, secret);
  } catch (err) {
    return {
      status: 401,
      message: 'Invalid token',
      type: 'Error'
    }
  }

  const payload = jwt.decode(token) as {email: string};

  if (!payload.email) {
    return {
      status: 401,
      message: 'Invalid token',
      type: 'Error'
    }
  }

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

  if (!user) {
    return {
      status: 401,
      message: 'Could not validate user',
      type: 'Error'
    }
  };

  return {
    user,
    type: 'Success'
  };
}