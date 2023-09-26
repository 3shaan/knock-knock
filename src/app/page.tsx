import AuthForm from "./(auth)/component/AuthForm";
import LotteAnimation from "./components/LotteAnimation";


type Props = {};

export default function login({}: Props) {
  return (
    <section className="flex flex-col md:flex-row min-h-full justify-center gap-3 sm:px-6 lg:px-6 bg-gray-100">
      <div className="w-full md:w-1/2 h-80">
        <LotteAnimation/>
      </div>
      <div className="text-center w-full md:w-1/2 space-y-7 pb-32 md:pb-0 md:pt-10">
        <h1 className="text-4xl mt-2">Hello, Stranger!</h1>
        <h1 className="text-center text-xl md:text-2xl my-2  ">Welcome to our chat app - <span className="text-purple-800">Knock Knock </span> <br /> where conversations come to life!</h1>
        <h1 className="text-4xl italic">Let&apos;s Start ...</h1>
        <div className="w-96 mx-auto">
          <AuthForm />
        </div>
      </div>
    </section>
  );
}
