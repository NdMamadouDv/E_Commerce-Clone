import { getSession } from "next-auth/react";
import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";

export default function Home({ products }) {
  // console.log(products);
  return (
    <div className="bg-gray-100">
      <Head key="1">
        <title key="title">Amazon 2.0</title>
      </Head>
      <Header />
      <main className="max-w-screen-2xl mx-auto">
        {/* Banner */}
        <Banner />
        <ProductFeed products={products} />
      </main>
    </div>
  );
}
export async function getServerSideProps(context) {
  const res = await fetch("https://fakestoreapi.com/products");

  const products = await res.json();
  const session = await getSession(context);

  if (!products) {
    return {
      notFound: true,
    };
  }

  return { props: { products, session } };
}

// Get -> https://fakestoreapi.com/products
