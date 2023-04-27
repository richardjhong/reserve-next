import { Time, convertToDisplayTime } from "../../../../../utils/convertToDisplayTime";

interface HeaderProps {
  day: string;
  time: string;
  partySize: string;
  name: string;
};

const Header = ({ day, time, partySize, name }: HeaderProps) => {
  const convertToReadableDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const formattedDate = date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    return formattedDate;
  };

  return (
    <div>
      <h3 className="font-bold">You're almost done!</h3>
      <div className="mt-5 flex">
        <img
          src="https://images.otstatic.com/prod1/49153814/2/medium.jpg"
          alt=""
          className="w-32 h-18 rounded"
        />
        <div className="ml-4">
          <h1 className="text-3xl font-bold">
            {name}
          </h1>
          <div className="flex mt-3">
            <p className="mr-6">{convertToReadableDate(day)}</p>
            <p className="mr-6">{convertToDisplayTime(time as Time)}</p>
            <p className="mr-6">{parseInt(partySize) === 1 ? `1 person` : `${partySize} people`}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header;