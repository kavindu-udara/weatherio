import React from 'react'

const Page = () => {
  return (
    <div className='h-screen flex justify-center items-center text-xl'>
      <div className='flex flex-col items-center gap-5 bg-white text-red-700 p-10 rounded-2xl shadow-lg'>
        <h1 className='text-6xl font-bold'>404</h1>
        <p className='text-gray-500'>Page Not Found</p>
      </div>
    </div>
  )
}

export default Page
