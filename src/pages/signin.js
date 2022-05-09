import { getProviders, signIn, useSession, signOut } from "next-auth/react";
import Header from "../components/Header";

export default function SignIn({ providers }) {
  console.log(providers);
  const { data: session } = useSession();

  console.log(session);
  return (
    <div className="flex flex-col h-screen ">
      <Header />

      <div className="flex flex-col h-screen justify-center">
        <div className="border rounded-md p-8 my-6  ">
          {/* {session && } */}
          {!session ? (
            Object.values(providers).map((provider) => (
              <div key={provider.name}>
                <button
                  onClick={() => signIn(provider.id)}
                  className="border text-sm font-bold bg-white py-3 my-5 text-green-600"
                >
                  Sign in with {provider.name}
                </button>
              </div>
            ))
          ) : (
            <button onClick={signOut}>Deco</button>
          )}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
