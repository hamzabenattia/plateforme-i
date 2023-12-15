import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import MainSlideShow from "../components/SlideShow/MainSlideShow";

const SlideShowScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainSlideShow />
      </main>
    </>
  );
};

export default SlideShowScreen;
