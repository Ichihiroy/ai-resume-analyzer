import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

export function meta() {
  return [
    { title: "Resumind | Auth" },
    {
      name: "description",
      content: "Authenticate to access your personalized resume analysis.",
    },
  ];
}

const Auth = () => {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  const next = location.search.split("next=")[1] || "/";
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate(next);
    }
  }, [auth.isAuthenticated, next]);

  return (
    <main className="bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex flex-col items-center justify-center gap-8">
      <section className="text-center flex flex-col">
        {auth.isAuthenticated ? (
          <>
            <h1>Welcome back!</h1>
            <h2>Your personalized resume analysis is ready.</h2>
          </>
        ) : (
          <>
            <h1>Welcome!</h1>
            <h2>Log In to Continue Your Job Journey</h2>
          </>
        )}
      </section>

      <div>
        <section>
          <div className="flex flex-col gap-8">
            {isLoading ? (
              <button className="auth-button text-2xl animate-pulse">
                Signing you in...
              </button>
            ) : (
              <>
                {auth.isAuthenticated ? (
                  <button
                    className="auth-button text-2xl"
                    onClick={auth.signOut}
                  >
                    Log Out
                  </button>
                ) : (
                  <button
                    className="auth-button text-2xl"
                    onClick={auth.signIn}
                  >
                    Log In
                  </button>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Auth;
