import Header from "./components/Header";
import React from "react";

interface RestaurantLayoutProps {
  children: React.ReactNode;
  params: {
    slug: string;
  }
};

const RestaurantLayout = ({ children, params }: RestaurantLayoutProps) => {
  return (
    <main>
      <Header name={params.slug} />
      <div className="flex m-auto w-2/3 justify-between items-start -mt-11">
        {children}
      </div>
    </main>
  )
}

export default RestaurantLayout;