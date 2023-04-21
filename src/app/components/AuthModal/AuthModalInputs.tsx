import React from 'react'

interface AuthModalInputsProps {
  inputs: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    password: string;
  },
  handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void,
  isSignin: boolean;
};

const AuthModalInputs = ({ inputs, handleChangeInput, isSignin }: AuthModalInputsProps) => {
  const { firstName, lastName, email, phone, city, password } = inputs;
  return (
    <div>
      {!isSignin && (<div className="my-3 flex justify-between text-sm">
        <input 
          type="text" 
          className="border rounded p-2 py-3 w-[49%] border-gray-300" 
          placeholder="First Name"
          value={firstName}
          onChange={handleChangeInput}
          name="firstName"
        />
        <input type="text" 
          className="border rounded p-2 py-3 w-[49%] border-gray-300" 
          placeholder="Last Name"
          value={lastName} 
          onChange={handleChangeInput}
          name="lastName"
        />
      </div>)}
      <div className="my-3 flex justify-between text-sm">
        <input 
          type="text" 
          className="border rounded p-2 py-3 w-full border-gray-300" 
          placeholder="Email"
          value={email}
          onChange={handleChangeInput}
          name="email"
         />
      </div>
      {!isSignin && (<div className="my-3 flex justify-between text-sm">
        <input 
          type="text" 
          className="border rounded p-2 py-3 w-[49%] border-gray-300" 
          placeholder="Phone"
          value={phone}
          onChange={handleChangeInput}
          name="phone"
        />
        <input type="text" 
          className="border rounded p-2 py-3 w-[49%] border-gray-300" 
          placeholder="City" 
          value={city}
          onChange={handleChangeInput}
          name="city"
        />
      </div>)}
      <div className="my-3 flex justify-between text-sm">
        <input 
          type="password" 
          className="border rounded p-2 py-3 w-full border-gray-300" 
          placeholder="Password"
          value={password}
          onChange={handleChangeInput}
          name="password"
         />
      </div>
    </div>
  )
}

export default AuthModalInputs;