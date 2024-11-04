import CreateCategory from '@/components/CreateCategory'
import SearchBar from '@/components/SearchBar'
import StructureNav from '@/components/StructureNav'
import { IsSuperadmin } from '@/constants/index'
import { authUser } from '@/lib/actions/user.actions'
import { getUserRole } from '@/lib/utils'
import { Search } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Layout = async({children}:{children:React.ReactNode}) => {
  const user = await authUser();
  const userRole = getUserRole(user)
  return (
    <section className="home">
        <div className="home-content">
            <div className="flex justify-between">
              {/* <SearchBar /> */}
              <div></div>
              {IsSuperadmin.includes(userRole[0]) && <CreateCategory/>}
            </div>
            <div className='rounded-md border bg-yellow-2 text-gray-500 p-2 px-4'>
                <StructureNav/>
                {children}
            </div>
        </div>
    </section>
  )
}

export default Layout
