import { CheckCircleIcon } from "@heroicons/react/solid";
import Header from "../components/Header";
import { useRouter } from "next/router";
function success() {
  const router = useRouter();
  return (
    <div className="bg-gray-100 h-screen">
      <Header />
      <main className="max-w-screen-lg mx-auto">
        <div className="flex flex-col p-10 bg-white">
          <div className="flex items-center space-x-2 mb-5">
            <CheckCircleIcon className="text-gree-500 h-10 " />
            <h1 className="text-3xl">
              Merci, votre commande a été prise en charge !
            </h1>
          </div>
          <p>
            Merci de votre confiance, Nous vous enverrons une message de
            confirmation à votre adresse ! En espérant vous revoir très vite !
            Vous pouvez voir l'etat de vos commandes ici.
          </p>
          <button
            onClick={() => router.push("/orders")}
            className="button mt-8"
          >
            Voir mes commandes
          </button>
        </div>
      </main>
    </div>
  );
}

export default success;
