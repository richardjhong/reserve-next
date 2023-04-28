"use client";

import { useEffect, useState } from "react";
import { getClient } from "../../../../../lib/client";
import { useBookReservationMutation } from "@/generated/graphql-frontend";
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';


interface FormProps {
  slug: string;
  day: string;
  time: string;
  partySize: string;
};

const client = getClient();

const Form = ({ slug, day, time, partySize }: FormProps) => {
  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    occasion: '',
    request: ''
  });

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });
  };

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    (inputs.firstName && inputs.lastName && inputs.email && inputs.phone) ? setDisabled(false) : setDisabled(true)
  }, [inputs]);

  const [bookReservation, { loading, data, error }] = useBookReservationMutation({ client });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await bookReservation({
        variables: {
          input: {
            slug,
            day,
            time,
            partySize,
            bkr_f_name: inputs.firstName,
            bkr_l_name: inputs.lastName,
            bkr_email: inputs.email,
            bkr_phone: inputs.phone,
            occasion: inputs.occasion.length ? inputs.occasion : null,
            request: inputs.request.length ? inputs.request : null,
          }
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
    {data && (
    <div className="mt-10 flex justify-center items-center w-full">
      <p>Reservation Confirmed</p>
    </div>
    )}
    <form className="mt-10 flex flex-wrap justify-between w-[660px]" onSubmit={handleSubmit}>
      {!data && (
        <>
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4 border-gray-300"
            placeholder="First name"
            value={inputs.firstName}
            name="firstName"
            onChange={handleChangeInput}
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4 border-gray-300"
            placeholder="Last name"
            value={inputs.lastName}
            name="lastName"
            onChange={handleChangeInput}
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4 border-gray-300"
            placeholder="Phone number"
            value={inputs.phone}
            name="phone"
            onChange={handleChangeInput}
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4 border-gray-300"
            placeholder="Email"
            value={inputs.email}
            name="email"
            onChange={handleChangeInput}
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4 border-gray-300"
            placeholder="Occasion (optional)"
            value={inputs.occasion}
            name="occasion"
            onChange={handleChangeInput}
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4 border-gray-300"
            placeholder="Requests (optional)"
            value={inputs.request}
            name="request"
            onChange={handleChangeInput}
          />
          {error ? (<Alert severity="error" className="mb-4 bg-red-200 text-black w-full">
            {error.message}
          </Alert>) : null}
          <button
            className="bg-red-600 w-full p-3 h-16 text-white font-bold rounded disabled:bg-gray-400"
            disabled={disabled || loading}
            type="submit"
          >
            {loading ? <CircularProgress color="inherit" /> : 'Complete reservation'}
          </button>
          <p className="mt-4 text-sm">
            By clicking “Complete reservation” you agree to the DineReserve Terms
            of Use and Privacy Policy. Standard text message rates may apply.
            You may opt out of receiving text messages at any time.
          </p>
      </>)}
    </form>
    </>
  )
}

export default Form;