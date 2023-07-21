"use client"
import { useState } from "react"
import { useRouter } from "next/navigation";


const AddTopic = () => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!title || !description){
      alert("Title and Description must be filled!")
      setTitle('')
      setDescription('')
      return
    }

    try{
      const res = await fetch('http://localhost:3000/api/topics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({title, description}),
      })
      if(res.ok){
        router.push('/')
        router.refresh()
      }else{
        throw new Error("Failed to create topic")
      }
    }catch(err){
      console.log(`Error adding topic: `, err);
    }
  } 

  return (
    <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
        <input 
            className='border border-slate-500 px-8 py-2'
            type='text'
            placeholder='Topic Title'
            onChange={(e) => setTitle(e.target.value)}
            value={title}
        />

        <input 
            className='border border-slate-500 px-8 py-2'
            type='text'
            placeholder='Topic Description'
            onChange={(e) => setDescription(e.target.value)}
            value={description}
        />

        <button className='bg-green-600 font-bold text-white py-3 px-6 w-fit' type="submit">
            Add Topic
        </button>
    </form>
  )
}

export default AddTopic
