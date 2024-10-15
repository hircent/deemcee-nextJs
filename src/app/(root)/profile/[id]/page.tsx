import React from 'react'

const page = ({ params }: { params: { id: number } }) => {
  return (
    <div className='text-white'>
      {params.id}
    </div>
  )
}

export default page
