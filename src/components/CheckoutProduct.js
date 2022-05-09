import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Currency from "react-currency-formatter";
import { addToBasket, removeFromBasket } from "../slices/basketSlice";
import { useDispatch } from "react-redux";

function CheckoutProduct({
  id,
  title,
  price,
  image,
  category,
  rating,
  description,
  hasPrime,
}) {
  const dispatch = useDispatch();
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
    dispatch(addToBasket(product));
  };
  const removeItemFromBasket = () => {
    // remove Item From Redux
    dispatch(removeFromBasket({ id }));
  };
  return (
    <div className="grid grid-cols-5" key={id}>
      <img className="w-12" />
      {/* Milieu */}
      <div className="col-span-3 mx-5">
        <p>{title}</p>
        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon className="h-5 text-yellow-500" />
            ))}
        </div>

        <p className="text-xs mt-2 mb-2 line-clamp-3">{description}</p>
        <div className="mb-5 ">
          <Currency quantity={price} currency="EUR" />
        </div>
        {hasPrime && (
          <div className="flex items-center space-x-2">
            <img
              src="http://links.papareact.com/fdw"
              alt=""
              loading="lazy"
              className="w-12"
            />
            <p className="text-xs text-gray-500">
              Livraison GRATUITE le jour d'après
            </p>
          </div>
        )}
      </div>
      {/* Right add/remove buttons */}
      <div className=" flex flex-col space-y-2 my-auto justify-self-end">
        <button className="button" onClick={addItemToBasket}>
          {" "}
          Ajouter au panier
        </button>
        <button className="button" onClick={removeItemFromBasket}>
          {" "}
          Retirer du panier
        </button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
