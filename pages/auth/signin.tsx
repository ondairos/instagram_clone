/* eslint-disable @next/next/no-img-element */
import React from "react";
import { getProviders, signIn } from "next-auth/react";
import Header from "@/components/Header";

type Provider = {
  id: string;
  name: string;
};

type SigninProps = {
  providers: Record<string, Provider>;
};

// browser
function signin({ providers }: SigninProps) {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen py-2 -mt-56 px-14 text-center">
        <img
          className="w-80"
          src="https://links.papareact.com/ocw"
          alt="logo"
        />
        <p>This app is built for educational purposes. No commercial use.</p>

        <div className="mt-40">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className="p-3 bg-purple-400 rounded-lg text-white"
                onClick={() => signIn(provider.id, { callbackUrl: "/" })}
              >
                Sign In with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// Server
export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}

export default signin;
