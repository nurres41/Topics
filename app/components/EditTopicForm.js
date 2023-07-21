"use client"

import { useState } from "react"
import { useRouter } from "next/navigation";


const EditTopicForm = ({id, title, description}) => {

  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('')

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try{
      const res = await fetch(`http://localhost:3000/api/topics/${id}`,{
        method: "PUT",
        headers: { 'Content-type' : 'application/json'},
        body: JSON.stringify({newTitle,newDescription})
      })
      if(!res.ok){
        throw new Error("Failed")
      }else{
        router.push('/')
        router.refresh()
      }
    }catch(err){
      console.log(err)
    }
  }

  return (
    <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
        <input 
            className='border border-slate-500 px-8 py-2'
            type='text'
            placeholder='Topic Title'
            onChange={(e) => setNewTitle(e.target.value)}
            value={newTitle}
        />

        <input 
            className='border border-slate-500 px-8 py-2'
            type='text'
            placeholder='Topic Title'
            onChange={(e) => setNewDescription(e.target.value)}
            value={newDescription} 
        />

        <button className='bg-green-600 font-bold text-white py-3 px-6 w-fit' type="submit">
            Update Topic
        </button>
    </form>
  )
}

export default EditTopicForm
