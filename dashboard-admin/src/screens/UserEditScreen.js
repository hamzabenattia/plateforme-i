import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import EditUserMain from "../components/users/EdituserMain";

const UserEditScreen = ({ match }) => {
  const userId = match.params.id;

  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditUserMain userid={userId} />
      </main>
    </>
  );
};
export default UserEditScreen;
