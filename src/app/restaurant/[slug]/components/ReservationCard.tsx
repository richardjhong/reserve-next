const ReservationCard = () => {
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
            <option value="">1 person</option>
            <option value="">2 people</option>
          </select>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col w-[48%]">
            <label>Date</label>
            <input type="text" className="py-3 border-b font-light w-28 border-gray-500" placeholder="Date" />
          </div>
          <div className="flex flex-col w-[48%]">
            <label>Time</label>
            <select className="py-3 border-b font-light border-gray-500">
              <option value="">7:30 AM</option>
              <option value="">7:30 PM</option>
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