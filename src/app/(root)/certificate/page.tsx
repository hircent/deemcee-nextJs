import React from "react";
import { authUser } from "@/lib/actions/user.actions";

const PromoCode = async () => {
  const user = await authUser();

  return <div className="home-content">main</div>;
};

export default PromoCode;
