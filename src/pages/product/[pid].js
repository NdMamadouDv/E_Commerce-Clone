import Header from "../../components/Header";
import { useDispatch } from "react-redux";
import { addToBasket } from "../../slices/basketSlice";
import { getSession, useSession } from "next-auth/react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import { useState } from "react";

const MAX_RATING = 5;
const MIN_RATING = 1;

export const getStaticPaths = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();

  const paths = products.map((product) => {
    return {
      params: { pid: product.id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.pid;
  const res = await fetch("https://fakestoreapi.com/products/" + id);
  const data = await res.json();
  return {
    props: { product: data },
  };
};

function pid({ product }) {
  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );
  //   console.log(product);
  const dispatch = useDispatch();
  const addItemToBasket = () => {
    // Sending the product as an action to the redux store(on the slice)
    dispatch(addToBasket(product.id));
  };
  return (
    <div>
      <Header />
      <main
        key={product.id}
        className=" relative flex flex-col mx-auto p-8  mt-16 lg:max-w-2xl "
      >
        <div className="flex flex-col mt-8 w-4/5  mx-auto bg-white space-y-6 min-h-full">
          <p className="absolute top-0 right-0 text-xs text-gray-400">
            {product.category}
          </p>
          <h1 className="text-start text-lg">{product.title}</h1>
          <Image
            src={product.image}
            width={250}
            height={250}
            objectFit="contain"
            className="mt-8 hover:scale-120"
          />

          <p className="italic text-sm ">{product.description}</p>
          <div className=" ">
            <Currency quantity={product.price} currency="EUR" />
          </div>
          <div className="flex">
            {Array(product.rating)
              .fill()
              .map((_, i) => (
                <StarIcon className="h-5 text-yellow-500" />
              ))}
          </div>
        </div>
        <button className="mt-auto button" onClick={addItemToBasket}>
          Ajouter au panier
        </button>
      </main>
    </div>
  );
}

export default pid;
