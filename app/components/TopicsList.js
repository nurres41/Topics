import React from 'react'
import RemoveButton from './RemoveButton'
import Link from 'next/link'
import {HiPencilAlt} from "react-icons/hi"

const getTopics = async () => {
    try{
        const res = await fetch('http://localhost:3000/api/topics',{
            cache: 'no-store'
        })

        if(!res.ok){
            throw new Error('Failed To Fetch Topics');
        }
        return res.json()

    }catch(err){
        console.log("Error loading topics: ",err)
    }
}

const TopicsList = async () => {

const { topics } = await getTopics();

  return (
    <>
    {topics.map((topic) => (
        <>
            <div className='p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start'>
                <div>
                    <h2 className='font-bold text-2xl'>{topic.title}</h2>
                    <div>{topic.description}</div>
                </div>
                <div className='flex gap-2'>
                    <RemoveButton id={topic._id}/>
                    <Link href={`/editTopic/${topic._id}`}>
                        <HiPencilAlt size={24} />
                    </Link>
                </div>
            </div> 
        </>
    ))}
    </>
  )
}

export default TopicsList
