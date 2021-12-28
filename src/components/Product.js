import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { useState } from "react";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket } from "../slices/basketSlice";

const MAX_RATING = 5;
const MIN_RATING = 1;

function Product({ id, title, price, image, category, description }) {
  const dispatch = useDispatch();
  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );

  const [hasPrime] = useState(Math.random() < 0.7);
  const addItemToBasket = () => {
    const product = {
      id,
      title,
      price,
      image,
      category,
      rating,
      description,
      hasPrime,
    };

    // Sending the product as an action to the redux store(on the slice)
    dispatch(addToBasket(product));
  };
  return (
    <div className="relative flex flex-col m-6 bg-white z-30 p-8  " key={id}>
      <p className="absolute top-2 text-xs italic right-2 text-gray-400">
        {category}
      </p>
      <Image src={image} height={200} width={200} objectFit="contain" />
      <h4 className="my-3">{title}</h4>
      <div className="flex">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarIcon className="h-5 text-yellow-500" />
          ))}
      </div>
      <p className="my-2 text-xs line-clamp-2">{description}</p>
      <div className="mb-5 ">
        <Currency quantity={price} currency="EUR" />
      </div>
      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-5">
          <img className="w-12" src="https://links.papareact.com/fdw" alt="" />
          <p className="text-xs text-gray-500">
            Livraison GRATUITE le jour d'après
          </p>
        </div>
      )}
      <button className="mt-auto button" onClick={addItemToBasket}>
        Ajouter au panier
      </button>
    </div>
  );
}

export default Product;
