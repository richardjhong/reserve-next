import Header from "./components/Header";
import React from "react";

interface Props {
  children: React.ReactNode;
  params: {slug: string}
};

const RestaurantLayout: React.FC<Props> = ({ children, params }) => {
  return (
    <main>
      <Header name={params.slug} />
      <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
        {children}
      </div>
    </main>
  )
}

export default RestaurantLayout;