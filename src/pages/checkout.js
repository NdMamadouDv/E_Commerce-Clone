import Image from "next/image";
import Header from "../components/Header";
import { selectItems, selectTotal } from "../slices/basketSlice";
import { useSelector } from "react-redux";
import CheckoutProduct from "../components/CheckoutProduct";
import Head from "next/head";
import { useSession } from "next-auth/react";
import Currency from "react-currency-formatter";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(process.env.stripe_public_key);
function checkout() {
  const items = useSelector(selectItems);
  // console.log(items);
  const { data: session } = useSession();
  const total = useSelector(selectTotal);
  // console.log(session);

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    // Call the back end to create a checkout session
    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items: items,
      email: session.user.email,
    });
    // Redirect user to stripe checkout
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    if (result.error) alert(result.error.message);
  };

  return (
    <div className="bg-gray-100">
      <Head key="checkout">
        <title key="title">Votre panier</title>
      </Head>
      <Header />
      <main className="lg:flex max-w-2xl mx-auto">
        {/* Gauche */}
        <Image
          src="https://links.papareact.com/ikj"
          width={1020}
          height={250}
          objectFit="contain"
        />
        <div className=" flex flex-col p-5 space-y-10 bg-white">
          <h1 className=" text-3xl border-b pb-4">
            {items.length === 0 ? "Votre panier est vide" : "Votre panier"}
          </h1>
          {items.map((item, i) => (
            // console.log(item),
            <CheckoutProduct
              key={i}
              id={item.id}
              title={item.title}
              rating={item.rating}
              price={item.price}
              description={item.description}
              image={item.image}
              hasPrime={item.hasPrime}
              category={item.category}
            />
          ))}
        </div>
        {/* Droite */}
        <div className="flex flex-col bg-white p-10 shadow-md">
          {items.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Sous total ({items.length} items ) :
                <span className="font-bold">
                  <Currency quantity={total} currency="EUR" />
                </span>
              </h2>
              <button
                onClick={createCheckoutSession}
                role="link"
                disabled={!session}
                className={`button mt-2 ${
                  !session &&
                  "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                }`}
              >
                {!session ? "Veuillez vous connecter" : "Proceder au paiement"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default checkout;
