import Navbar from "./components/Navbar";
import DropDown from "./ui/DropDown";

export default async function Home() {

  const response = await fetch('http://localhost:5000/get-categories')
  const {categories} = await response.json()

  return (
    <>
      <Navbar />
    <div className="mt-16 font-[family-name:var(--font-geist-sans)] flex justify-center px-16 font-mono">
      <div className="bg-white w-3/5 h-12 mt-24 rounded-t-md">
        <h3 className="m-3 text-black font-bold text-xl">Select a Category for questions</h3>
        <DropDown categories={categories}/>
      </div>
    </div>
    </>
  );
}
