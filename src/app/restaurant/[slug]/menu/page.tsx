import RestaurantNavBar from '../components/RestaurantNavBar';
import Menu from '../components/Menu';

export const metadata = {
  title: 'Menu - Milestones Grill (Toronto)',
  description: 'Generated by create next app',
}

const MenuPage = () => {
  return (
    <>
      <div className="bg-white w-[100%] rounded p-3 shadow text-black">
        <RestaurantNavBar />
        <Menu />
      </div>          
    </>
  )
}

export default MenuPage;