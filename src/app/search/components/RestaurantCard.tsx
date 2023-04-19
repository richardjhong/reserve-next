import Link from 'next/link'
import { CityRestaurantType } from '../page'
import Price from '@/app/components/Price';

interface Props {
  restaurant: CityRestaurantType;
  key: string;
};

const SearchRestaurantCard = ({ restaurant }: Props) => {
  const { id, name, main_image, price, cuisine, location, slug } = restaurant;
  return (
    <div className="border-b flex pb-5 ml-4">  
      <img
        src={main_image}
        alt=""
        className="w-44 rounded h-36"
      />
      <div className="pl-5">
        <h2 className="text-3xl">{name}</h2>
        <div className="flex items-start">
          <div className="flex mb-2">*****</div>
          <p className="ml-2 text-sm">Awesome</p>
        </div>
        <div className="mb-9">
          <div className="font-light flex text-reg">
            <Price price={price} />
            <p className="mr-4 capitalize">{cuisine.name}</p>
            <p className="mr-4 capitalize">{location.name}</p>
          </div>
        </div>
        <div className="text-red-600">
        <Link href={`/restaurant/${slug}`}>
          View more information
        </Link>
        </div>
      </div>
    </div>
  )
}

export default SearchRestaurantCard