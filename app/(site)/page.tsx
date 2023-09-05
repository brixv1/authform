import AuthForm from "../components/AuthForm";

export default function Home() {
  return (
    <div
      className="
        flex 
        max-h-screen 
        min-h-full
        flex-col 
        justify-center 
        bg-neutral-700 
        py-12 
        sm:bg-[url('/images/blob-haikei.svg')]
        sm:bg-cover
        sm:bg-center
        sm:bg-no-repeat
        sm:px-6
        lg:px-8 
      "
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2
          className="
            mt-6 
            text-center 
            text-3xl 
            font-bold 
            tracking-tight 
            text-slate-100
          "
        >
          Welcome
        </h2>
      </div>
      <AuthForm />
    </div>
  );
}
