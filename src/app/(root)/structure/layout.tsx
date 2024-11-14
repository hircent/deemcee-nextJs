import CreateCategory from '@/components/CreateCategory'
import SectionNav from '@/components/SectionNav'
import { IsSuperadmin, StructureLinks } from '@/constants/index'
import { authUser } from '@/lib/actions/user.actions'
import { getUserRole } from '@/lib/utils'
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
                <SectionNav links={StructureLinks}/>
                {children}
            </div>
        </div>
    </section>
  )
}

export default Layout
