import SearchBar from '@/components/SearchBar'
import StructureNav from '@/components/StructureNav'
import { Search } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Layout = ({children}:{children:React.ReactNode}) => {
  return (
    <section className="home">
        <div className="home-content">
            <SearchBar/>
            <div className='rounded-md border bg-yellow-2 text-gray-500 p-2 px-4'>
                <StructureNav/>
                {children}
            </div>
        </div>
    </section>
  )
}

export default Layout
