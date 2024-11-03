"use client"

import { useRouter } from "next/navigation"
import { ChangeEvent } from "react"

export default function DropDown({categories}: {categories: string[]}) {

    const router = useRouter()

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        if(event.target.value !== localStorage.getItem('category')) localStorage.removeItem('category')

        router.push(`/quiz/${event.target.value}`)
    }

    return (
        <select onChange={handleChange} name="" id="" className="w-full p-3 rounded-b-md outline-none text-black">
            <option value="" className="p-3" hidden>Select Category</option>
            {categories.map((category: string, index: number) => {
                return <option value={category} key={index} className="p-3">{category}</option>
            })}
        </select>
    )
}
