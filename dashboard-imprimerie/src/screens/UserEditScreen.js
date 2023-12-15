import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import EditUserMain from "../components/users/EdituserMain";

const UserEditScreen = () => {
  

  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditUserMain/>
      </main>
    </>
  );
};
export default UserEditScreen;
