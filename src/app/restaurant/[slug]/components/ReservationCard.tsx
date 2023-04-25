"use client";

import { partySize, times } from "@/app/data";
import { useState } from "react";
import DatePicker from 'react-datepicker';

interface ReservationCardProps {
  openTime: string;
  closeTime: string;
};

const ReservationCard = ({ openTime, closeTime }: ReservationCardProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleDateChange = (date: Date | null) => {
    return date ? setSelectedDate(date) : setSelectedDate(null);
  };

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
          <select className="py-3 border-b border-gray-500 font-light">
            {partySize.map(party => (<option value={party.value}>{party.label}</option>))}
          </select>
        </div>
        <div className="flex justify-between items-end">
          <div className="flex flex-col w-[48%]">
            <label>Date</label>
            <DatePicker 
              selected={selectedDate} 
              onChange={handleDateChange}
              className="py-3 pl-1 border-b font-light text-reg w-70 border-gray-500"
              dateFormat="MMMM dd"
              wrapperClassName="w-[48%]"
            />
          </div>
          <div className="flex flex-col w-[48%]">
            <label>Time</label>
            <select className="py-3 border-b font-light border-gray-500">
              {filterRestaurantWindowTimes().map(time => (
                <option value={time.time}>{time.displayTime}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-5">
          <button className="bg-red-600 rounded w-full px-4 text-white font-bold h-16">Find a Time</button>
        </div>
      </div>
    </div>
  )
}

export default ReservationCard;