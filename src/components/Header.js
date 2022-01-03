import Image from "next/image";
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { selectItems } from "../slices/basketSlice";
import { useSelector } from "react-redux";

function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const items = useSelector(selectItems);

  // console.log(session);
  return (
    <header className="">
      {/* Top nav bar */}
      <div className="flex items-center bg-amazon_blue flex-grow py-2">
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
          <Image
            onClick={() => router.push("/")}
            src="https://links.papareact.com/f90"
            width={150}
            height={40}
            objectFit="contain"
            className="cursor-pointer"
          />
        </div>
        {/* Search bar */}
        <div className="hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500">
          {" "}
          <input
            type="text"
            className="p-2 h-full w-6 flex-grow rounded-l-md focus:outline-none"
          />
          <SearchIcon className="h-12 p-4" />
        </div>
        {/* Right */}
        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
          <div className="link" onClick={!session ? signIn : signOut}>
            <p>{session ? `Hello ${session.user.name}` : "Se connecter"}</p>
            <p className="font-extrabold md:text-sm">Compte et liste </p>
          </div>
          <div className="link" onClick={() => router.push("/orders")}>
            <p>Retours</p>
            <p className="font-extrabold">& Commandes</p>
          </div>
          <div
            className="relative flex items-center  link"
            onClick={() => router.push("/checkout")}
          >
            <span className="bg-yellow-400 absolute top-0 right-0 md:right-10 h-4 w-4 text-center rounded-full text-black font-bold ">
              {items.length}
            </span>
            <ShoppingCartIcon className="h-10 " />
            <p className="font-extrabold hidden md:inline mt-2">Panier</p>
          </div>
        </div>
      </div>

      {/* Bottom navigation bar */}
      <div className="flex items-center  space-x-3 p-2 pl-6 bg-amazon_blue-light text-sm text-white">
        <p className=" link flex items-center">
          <MenuIcon className="h-6 mr-1" />
          Toutes
        </p>
        <p className=" link ">Prime Video</p>
        <p className=" link ">Meilleures Ventes</p>
        <p className=" link ">Amazon's Basics</p>
        <p className=" link hidden md:inline-flex ">Dernières nouveautées</p>
        <p className=" link hidden md:inline-flex ">Musique</p>
        <p className=" link hidden md:inline-flex ">Service client</p>
        <p className=" link hidden lg:inline-flex ">Ebooks Kindle</p>
        <p className=" link hidden lg:inline-flex ">Idées cadeaux</p>
        <p className=" link hidden lg:inline-flex ">Livres</p>
        <p className=" link hidden xl:inline-flex ">Cuisine et Maison</p>
        <p className=" link hidden xl:inline-flex ">High-Tech</p>
        <p className=" link hidden xl:inline-flex ">Jeux et Jouets</p>
        <p className=" link hidden 2xl:inline-flex ">Informatique</p>
        <p className=" link hidden 2xl:inline-flex ">Jeux Vidéo</p>
      </div>
    </header>
  );
}

export default Header;
