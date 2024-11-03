import Image from "next/image";

export default function Navbar() {
    return (
        <div className="w-full h-16 bg-white flex items-center rounded-b-md sticky">
            <Image className="mx-5" src={'/logo.svg'} alt="logo" width={50} height={50}></Image>
            <h2 className="text-black font-extrabold text-xl">QUIZ APP</h2>
        </div>
    )
}