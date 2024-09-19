import React from 'react'

const modal = ({setShowModal}) => {
  return (
    <div className='flex justify-center items-center bg-black bg-opacity-45 w-screen h-screen fixed top-0 left-0 font-roboto'>

        <div className='p-5 bg-white w-96 rounded-md'>
            <div className='flex justify-end'>
                <div onClick={() => {setShowModal(false)}} className='p-2 cursor-pointer'>x</div>
            </div>
            <form className='flex flex-col gap-2' action="">
                <input className='h-9 w-full border border-gray-200 px-2' placeholder='Name' type="text" />
                <input className='h-9 w-full border border-gray-200 px-2' placeholder='password' type="text" />
                <button className='bg-blue-500 px-5 py-2 rounded-sm text-white'>Change Password</button>

            </form>

        </div>


    </div>
  )
}

export default modal