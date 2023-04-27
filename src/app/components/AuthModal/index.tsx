"use client";

interface AuthModalProps {
  isSignin: boolean;
  onSuccess: () => void;
}

import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AuthModalInputs from './AuthModalInputs';
import { useLoginUserMutation, useRegisterUserMutation, useValidUserQuery, ValidateLoginInput } from '@/generated/graphql-frontend';
import { getClient } from '../../../../lib/client';
import { CircularProgress, Alert } from '@mui/material';
import { setCookie } from 'cookies-next';
import { RegisterUserInput } from '@/generated/graphql-backend';

const client = getClient();

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const AuthModal = ({ isSignin, onSuccess }: AuthModalProps)  =>{
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    password: ''
  });

  const [disabled, setDisabled] = useState(true);
  const [login, { loading: loginLoading, error: loginError }] = useLoginUserMutation({ client });
  const [register, { loading: registerLoading, error: registerError }] = useRegisterUserMutation({ client });

  useEffect(() => {
    if (isSignin) {
      if (inputs.password && inputs.email) return setDisabled(false);
    } else {
      if (Object.values(inputs).every(input => input !== '')) return setDisabled(false);
    };

    setDisabled(true);
  }, [inputs])

  const renderContent = (signinContent: string, signupContent: string) => {
    return isSignin ? signinContent : signupContent;
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSignin) {
      if (!loginLoading) {
        const loginResult = await login({
          variables: {
              input: {
                email: inputs.email,
                password: inputs.password
              } as ValidateLoginInput
            }
        });

        setCookie(
          'jwt', 
          loginResult?.data?.loginUser?.response, 
          {
            // httpOnly: true,
            path: '/',
            sameSite: 'strict',
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 60 * 60 * 2 // 2 hours
          }
        );
      }
    } else {
      if (!registerLoading) {
        const registerResult = await register({
          variables: {
            input: {
              first_name: inputs.firstName,
              last_name: inputs.lastName,
              email: inputs.email,
              phone: inputs.phone,
              city: inputs.city,
              password: inputs.password
            } as RegisterUserInput
          }
        });

        setCookie(
          'jwt', 
          registerResult?.data?.registerUser?.response, 
          {
            // httpOnly: true,
            path: '/',
            sameSite: 'strict',
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 60 * 60 * 2 // 2 hours
          }
        );
      }
    }
    if (!loginError && !registerError) handleClose();
    onSuccess();
  };
  
  return (
    <div>
      <button 
        className={`${renderContent("bg-blue-400 text-white", "text-gray-700 border-gray-300")} border p-1 px-4 rounded mr-3`}
        onClick={handleOpen}
      >
        {renderContent("Sign In", "Sign Up")}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="text-black"
      >
        <Box sx={style}>
         {(loginLoading || registerLoading) ? (
           <div className="py-24 px-2 h-[600px] flex justify-center">
              <CircularProgress />
            </div>
          ) : (
            <form className="p-2 h-[600px]" onSubmit={handleSubmit}>
              {loginError ? 
              <Alert severity="error" className="mb-4 bg-red-200 text-black">
                {loginError.message}
              </Alert> 
              : null}
               {registerError ? 
              <Alert severity="error" className="mb-4 bg-red-200 text-black">
                {registerError.message}
              </Alert> 
              : null}
              <div className="uppercase font-bold text-center pb-2 border-b mb-2 border-gray-400">
                <p className="text-sm">
                  {renderContent("Sign In", "Create Account")}
                  sign in
                </p>
            </div>
            <div className="m-auto">
              <h2 className="text-2xl font-light text-center">
                {renderContent("Log Into Your Account", "Create your OpenTable Account")}
              </h2>
              <AuthModalInputs 
                inputs={inputs} 
                handleChangeInput={handleChangeInput} 
                isSignin={isSignin}
              />
              <button 
                className="uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400" 
                disabled={disabled}
                type="submit"
              >
                {renderContent(
                  "Sign In",
                  "Create Account"
                )}
              </button>
            </div>
          </form>)}
        </Box>
      </Modal>
    </div>
  );
}

export default AuthModal;