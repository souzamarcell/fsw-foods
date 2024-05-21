"use client";
import { Suspense, useEffect, useState } from "react";
// import Restaurants from "./_components/restaurants";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../_lib/auth";
import { db } from "../_lib/prisma";
import { notFound, useSearchParams } from "next/navigation";
import { Restaurant } from "@prisma/client";
import { searchForRestaurants } from "./_actions/search";
import Header from "../_components/header";
import RestaurantItem from "../_components/restaurant-item";

// const RestaurantsPage = async () => {
const RestaurantsPage = () => {
  const searchParams = useSearchParams();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const searchFor = searchParams.get("search");

  useEffect(() => {
    const fetcRestaurants = async () => {
      if (!searchFor) return;
      const foundRestaurants = await searchForRestaurants(searchFor);
      setRestaurants(foundRestaurants);
    };
    fetcRestaurants();
  }, [searchFor]);

  // const session = await getServerSession(authOptions);
  // const
  // const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
  //   where: {
  //     userId: session?.user.id,
  //   },
  //   include: {
  //     restaurant: true,
  //   },
  // });

  // const searchFor = searchParams.get("search");
  if (!searchFor) {
    return notFound();
  }

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">Restaurantes Encontrados</h2>
        <div className="flex w-full flex-col gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              key={restaurant.id}
              restaurant={restaurant}
              className="min-w-full max-w-full"
              // userFavoriteRestaurants={userFavoriteRestaurants}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default RestaurantsPage;
