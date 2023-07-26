import Image from "next/image";
import AuthForm from "../component/AuthForm";

type Props = {};

export default function login({}: Props) {
  return (
    <section className="flex min-h-full justify-center py-12 sm:px-6 lg:px-6 bg-gray-100">
      <div>
        <h1 className="text-4xl mt-20 first-letter:text-5xl ">welcome</h1>
        <h1 className="text-center text-2xl my-2  ">to</h1>
        <h1 className="text-4xl italic text-purple-800">knock-knock</h1>
        {/* <Image height={48} width={48} alt="knock-knock" src={'/knock.jpg'}/> */}
        <div>
            <AuthForm/>
        </div>
      </div>
    </section>
  );
}
