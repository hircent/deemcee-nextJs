import HeaderBox from "@/components/HeaderBox";
import RightSideBar from "@/components/RightSideBar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import React from "react";

const Home = () => {
  const loggedIn = {
    firstName: "hircent",
    lastName: "Ong",
    email: "hircent@gmail.com",
    userId: "asd123",
    $id: "1",
  };
  return (
    // Class is not from tailwind but predefine in global css
    <section className="home">
      <div className="home-content">Recent Transactiona</div>

      {/* <RightSideBar
        user={loggedIn}
        transactions={[]}
        banks={[{ currentBalance: 12345 }, { currentBalance: 32123 }]}
      /> */}
    </section>
  );
};

export default Home;
