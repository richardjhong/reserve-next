import { Item } from "@prisma/client";

interface MenuCardProps {
  item: Item;
}

const MenuCard = ({item}: MenuCardProps) => {
  const { name, description, price } = item;
  return (
    <div className="border border-gray-300 rounded p-3 w-[49%] mb-3">
      <h3 className="font-bold text-lg">{name}</h3>
      <p className="font-light mt-1 txt-sm">{description}</p>
      <p className="mt-7">{price}</p>
    </div>
  )
}

export default MenuCard;