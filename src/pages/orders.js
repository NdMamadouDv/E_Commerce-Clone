import Header from "../components/Header";
import { getSession, useSession } from "next-auth/react";
import db from "../firebase";
import moment from "moment";
import Order from "../components/Order";
import {useRouter} from 'next/router'


function orders({ orders }) {
  //   const session = getSession();
  //   console.log(session);
  const router = useRouter()
  const { data: session } = useSession();
  console.log(orders);
  return (
    <div>
      <Header />
      <main className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
          Vos commandes
        </h1>
        {!session && orders ? (
          <h2>{orders.length} commande {orders.length> 1 ? "s" : ""}</h2>
        ) : (
          <h2> Connectez vous pour voir vos commandes <span className="text-blue-600 cursor-pointer"
          onClick={()=>{router.push('/signin')}}>Ici</span></h2>
          
        )}
        <div className="mt-5 space-y-4">
          {
            orders ?
            .map(({id,amount,amountShipping,images,items,timestamp}) => (
              <Order
              key = {id}
              id={id}
              amount ={amount}
              amountShipping = {amountShipping}
              images = {images}
              items= {items}
              timestamp= {timestamp}
              />
            )
            )}
        </div>
      </main>
    </div>
  );
}

export default orders;
export async function getServerSideProps(context) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  //   Get the session logged in credentials
  const session = await getSession(context);
  if (!session) {
    return {
      props: {},
    };
  }

  // console.log(session);
  const stripeOrders = await db
    .collection("users")
    .doc(session.user.email)
    .collection("orders")
    .orderBy("timestamp", "desc")
    .get();

  //   Stripe's orders
  const orders = await Promise.all(
    stripeOrders.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      amountShipping: order.data().amount_shipping,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        })
      ).data,
    }))
  );

  return {
    props: {
      orders,
    },
  };
}
