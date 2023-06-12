import React from "react";
import { getProviders, signIn } from "next-auth/react";

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
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
            Sign In with {provider.name}
          </button>
        </div>
      ))}
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
