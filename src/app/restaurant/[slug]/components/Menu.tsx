import { Item } from "@prisma/client";
import MenuCard from "./MenuCard";

const Menu = ({menu}: {menu: Item[]}) => {
  return (
      <main className="bg-white mt-5">
      <div>
        <div className="mt-4 pb-1 mb-1">
          <h1 className="font-bold text-4xl">
            Menu
          </h1>
          {menu.length ? (
            <div className="flex flex-wrap justify-between">
              {menu.map((item, i) => (
                <MenuCard key={`item-${i}`} item={item}/>
              ))}
            </div>
          ): (
            <div className="flex flex-wrap justify-between">
              <p>This restaurant has no listed menu.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default Menu;