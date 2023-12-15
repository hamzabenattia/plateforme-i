import React from "react";
import CreateSlideShow from "./CreateSlideShow";
import SlideShowTable from "./SlideShowTable";

const MainSlideShow = () => {
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Diapositive d'accueil</h2>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="row">
            {/* Create slideshow */}
            <CreateSlideShow />
            {/* slideshow table */}
            <SlideShowTable />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainSlideShow;
