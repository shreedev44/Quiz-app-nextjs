import Navbar from "@/app/components/Navbar";
import QuestionCard from "@/app/ui/QuestionCard";
import Image from "next/image";

export default async function Quiz({
  params,
}: {
  params?: { category?: string[] };
}) {
  const param = params?.category?.[0];
  let data;
  if (!param) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    data = { quiz: [] };
  } else {
    const response = await fetch(
      `http://localhost:5000/get-questions/${param}`,
      { cache: "force-cache", next: { revalidate: 30 } }
    );

    data = await response.json()
  }

  return (
    <>
      <Navbar />
      <div className="mt-12 w-full px-32 flex font-mono">
        <QuestionCard quiz={data.quiz} category={param} />
        <Image
          className="ml-24"
          src={"/hero.svg"}
          alt="logo"
          width={200}
          height={200}
        />
      </div>
    </>
  );
}
