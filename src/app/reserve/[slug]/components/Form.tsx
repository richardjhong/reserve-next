"use client";

import { useEffect, useState } from "react";
import { getClient } from "../../../../../lib/client";
import { useBookReservationMutation } from "@/generated/graphql-frontend";
import { CircularProgress } from '@mui/material';

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
    <form className="mt-10 flex flex-wrap justify-between w-[660px]" onSubmit={handleSubmit}>
      {data ? (
      <div>
        <h1>You are all booked up</h1>
        <p>Enjoy your reservation</p>
      </div>
      ) : (
        <>
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="First name"
            value={inputs.firstName}
            name="firstName"
            onChange={handleChangeInput}
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Last name"
            value={inputs.lastName}
            name="lastName"
            onChange={handleChangeInput}
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Phone number"
            value={inputs.phone}
            name="phone"
            onChange={handleChangeInput}
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Email"
            value={inputs.email}
            name="email"
            onChange={handleChangeInput}
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Occasion (optional)"
            value={inputs.occasion}
            name="occasion"
            onChange={handleChangeInput}
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Requests (optional)"
            value={inputs.request}
            name="request"
            onChange={handleChangeInput}
          />
          <button
            className="bg-red-600 w-full p-3 h-16 text-white font-bold rounded disabled:bg-gray-400"
            disabled={disabled || loading}
            type="submit"
          >
            {loading ? <CircularProgress color="inherit" /> : 'Complete reservation'}
          </button>
          <p className="mt-4 text-sm">
            By clicking “Complete reservation” you agree to the OpenTable Terms
            of Use and Privacy Policy. Standard text message rates may apply.
            You may opt out of receiving text messages at any time.
          </p>
      </>)}
    </form>
  )
}

export default Form;