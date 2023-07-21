"use client"
import { useRouter } from "next/navigation"
import { HiOutlineTrash } from "react-icons/hi"



const RemoveButton = ({id}) => {

  const router = useRouter();

  const removeTopic = async() => {
    const confirmed = confirm('Are you sure?')

    if(confirmed){
      const res = await fetch(`http://localhost:3000/api/topics?id=${id}`,{
        method: "DELETE"
      })
      if(res.ok){
        router.refresh();
      }
    }
  }

  return (
    <button className="text-red-500" onClick={removeTopic}>
        <HiOutlineTrash size={24}/>
    </button>
  )
}

export default RemoveButton
