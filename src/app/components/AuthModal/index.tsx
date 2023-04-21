"use client";

interface AuthModalProps {
  isSignin: boolean;
}

import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AuthModalInputs from './AuthModalInputs';
import { useLoginUserMutation, ValidateLoginInput } from '@/generated/graphql-frontend';
import { getClient } from '../../../../lib/client';

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

const AuthModal = ({ isSignin }: AuthModalProps)  =>{
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

  const [login, { data, loading: loginLoading, error: loginError }] = useLoginUserMutation({ client });


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

  const handleClick = async () => {
    if (isSignin) {
      if (!loginLoading) {
        if (loginError) console.log(loginError);
        console.log('testing');
        const loginResult = await login({
          variables: {
              input: {
                email: inputs.email,
                password: inputs.password
              } as ValidateLoginInput
            }
        });
        console.log('hi there', loginResult.data?.loginUser.token);
      }
    }
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
         <div className="p-2 h-[600px]">
          <div className="uppercase font-bold text-center pb-2 border-b mb-2 border-gray-400">
            <p className="text-sm">
              {renderContent("Sign In", "Create Account")}
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
              onClick={handleClick}
            >
              {renderContent(
                "Sign In",
                "Create Account"
              )}
            </button>
          </div>
         </div>
        </Box>
      </Modal>
    </div>
  );
}

export default AuthModal;