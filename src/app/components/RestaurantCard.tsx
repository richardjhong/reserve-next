import Link from 'next/link'
import { RestaurantCardType } from '../page'
import Price from './Price';

interface Props {
  restaurant: RestaurantCardType;
  key: string;
};

const RestaurantCard = ({ restaurant }: Props) => {
  const { id, name, main_image, cuisine, location, price, slug } = restaurant;
  return (
    <div className="w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer">
      <Link href={`/restaurant/${slug}`}>
        <img src={main_image} alt="" className="w-full h-36" />
        <div className="p-1">
          <h3 className="font-bold text-2xl mb-2">{name}</h3>
          <div className="flex items-start">
            <div className="flex mb-2">
              ****
            </div>
            <p className="ml-2">77 Reviews</p>
          </div>
          <div className="flex text-reg font-light">
            <p className="mr-3 capitalize">{cuisine.name}</p>
            <Price price={price}/>
            <p className="capitalize">{location.name}</p>
          </div>
          <p className="text-sm mt-1 font-bold">Booked 3 times today</p>
        </div>
      </Link>
    </div>
  )
}

export default RestaurantCard;