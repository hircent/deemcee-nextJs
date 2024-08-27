
import HeaderBox from '@/components/HeaderBox';
import RightSideBar from '@/components/RightSideBar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import React from 'react'

const Home = () => {
  const loggedIn = {firstName:"hircent"};
  return (
      // Class is not from tailwind but predefine in global css
      <section className='home'>
        <div className='home-content'>
          <header className='home-header'>
            <HeaderBox
              type="greeting"
              title="Welcome"
              user={loggedIn?.firstName || "Guest"}
              subtext="Access and manage your account and ...."
            />

            <TotalBalanceBox
              accounts={[]}
              totalBanks={1}
              totalCurrentBalance={1250444.88}
            />
          </header>

          Recent Transactiona
        </div>

        <RightSideBar 
          user={loggedIn}
          transactions={[]}
          banks={[]}
        />
      </section>
  )
}

export default Home
