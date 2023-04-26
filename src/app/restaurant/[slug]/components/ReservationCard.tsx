"use client";

import { partySize, times } from "@/app/data";
import { useCheckAvailabilityLazyQuery } from "@/generated/graphql-frontend";
import { useState, useEffect } from "react";
import { getClient } from "../../../../../lib/client";
import DatePicker from 'react-datepicker';

const client = getClient();

interface ReservationCardProps {
  slug: string;
  openTime: string;
  closeTime: string;
};

const ReservationCard = ({ slug, openTime, closeTime }: ReservationCardProps) => {
  const filterRestaurantWindowTimes = () => {
    const timesWithinWindow: typeof times = [];

    let isWithinWindow = false;

    times.forEach(time => {
      if (time.time == openTime) {
        isWithinWindow = true;
      };

      if (isWithinWindow) {
        timesWithinWindow.push(time)
      };

      if (time.time == closeTime) {
        isWithinWindow = false;
      };
    });

    return timesWithinWindow;
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear().toString(); 
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); 
    const day = date.getDate().toString().padStart(2, "0"); 
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>(`${filterRestaurantWindowTimes()[0]['time']}`);
  const [selectedPartySize, setSelectedPartySize] = useState<string>('1');

  const [checkAvailability, { loading, data, error }] = useCheckAvailabilityLazyQuery({client});
  
  useEffect(() => {
    console.log('data: ', data)
  }, [data]);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date)
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement> ) => {
    setSelectedTime(e.target.value);
  };

  const handlePartysizeChange = (e: React.ChangeEvent<HTMLSelectElement> ) => {
    setSelectedPartySize(e.target.value.split(' ')[0]);
  };

  const handleCheckAvailabilityClick = async () => {
    await checkAvailability({ variables: { input: {slug, day: formatDate(selectedDate), time: selectedTime, partySize: selectedPartySize} }});
  }

  return (
    <div className="w-[27%] relative text-reg text-black">
      <div className="fixed w-[12%] bg-white rounded p-3 shadow">
        <div className="text-center border-b border-gray-500 pb-2 font-bold">
          <h4 className="mr-7 text-lg">
            Make a Reservation
          </h4>
        </div>
        <div className="my-3 flex flex-col">
          <label>Party size</label>
          <select className="py-3 border-b border-gray-500 font-light" onChange={handlePartysizeChange}>
            {partySize.map(party => (<option key={party.value} value={party.value}>{party.label}</option>))}
          </select>
        </div>
        <div className="flex justify-between items-end">
          <div className="flex flex-col w-[48%]">
            <label>Date</label>
            <DatePicker 
              selected={selectedDate} 
              onChange={handleDateChange}
              className="py-3 pl-1 border-b font-light text-reg w-40 border-gray-500"
              dateFormat="MMMM dd"
              wrapperClassName="w-[48%]"
            />
          </div>
          <div className="flex flex-col w-[48%]">
            <label>Time</label>
            <select className="py-3 border-b font-light border-gray-500" onChange={handleTimeChange}>
              {filterRestaurantWindowTimes().map(time => (
                <option key={time.time} value={time.time}>{time.displayTime}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-5">
          <button 
            className="bg-red-600 rounded w-full px-4 text-white font-bold h-16"
            onClick={handleCheckAvailabilityClick} 
          >
            Find a Time
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReservationCard;