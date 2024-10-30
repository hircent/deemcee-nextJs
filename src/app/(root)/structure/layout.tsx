import SearchBar from '@/components/SearchBar'
import { Search } from 'lucide-react'
import React from 'react'

const Layout = ({children}:{children:React.ReactNode}) => {
  return (
    <section className="home">
        <div className="home-content">
            <SearchBar/>
            <div className='rounded-md border bg-yellow-2 text-gray-500'>
                {children}
            </div>
        </div>
    </section>
  )
}

export default Layout
