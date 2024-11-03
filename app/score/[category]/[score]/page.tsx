import Navbar from "@/app/components/Navbar";


export default async function Score({params}: {params: {score: string, category: string}}) {
    const {score, category} = await params
    return (
        <>
            <Navbar />
            <div className="flex m-24 border-4 border-white rounded-xl h-96 justify-center items-center">
                <div className="flex flex-col">
                    <span className="font-extrabold text-3xl text-center mb-5">Congratulations!!!</span>
                    <span className="font-extrabold text-3xl">Your score in {category} quiz is {score}</span>
                </div>
            </div>
        </>
    )
}