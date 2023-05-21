import React from 'react'
import { MetroSpinner } from "react-spinners-kit";

const Spinner = ( { message } ) => {
  return (
    <div className='flex flex-col justify-center items-center w-full h-full'>
      <MetroSpinner
                color="black"
                size={40}
                className="m-5"
            />

            <p className='text-lg text-center px-2'>{message}</p>
    </div>
  )
}

export default Spinner
