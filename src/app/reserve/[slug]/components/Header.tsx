import { Time, convertToDisplayTime } from "../../../../../utils/convertToDisplayTime";
import { format } from 'date-fns';

interface HeaderProps {
  day: string;
  time: string;
  partySize: string;
  restaurant: {
    name: string;
    main_image: string;
  }
};

const Header = ({ day, time, partySize, restaurant }: HeaderProps) => {
  const { name, main_image } = restaurant;

  const dayWithSlashes = new Date(day.replace(/-/g, '/'));

  return (
    <div>
      <div className="mt-5 flex">
        <img
          src={main_image}
          alt=""
          className="w-32 h-18 rounded"
        />
        <div className="ml-4">
          <h1 className="text-3xl font-bold">
            {name}
          </h1>
          <div className="flex mt-3">
            <p className="mr-6">{format(new Date(dayWithSlashes), "cccc, LLLL do")}</p>
            <p className="mr-6">{convertToDisplayTime(time as Time)}</p>
            <p className="mr-6">{parseInt(partySize) === 1 ? `1 person` : `${partySize} people`}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header;