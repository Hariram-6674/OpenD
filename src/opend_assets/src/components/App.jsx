import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import homeImage from "../../assets/home-img.png";
import Item from "./Item";
import Minter from "./Minter";

function App() {

  // const NFTid = "rkp4c-7iaaa-aaaaa-aaaca-cai";

  return (
    <div className="App">
      <Header />
      {/* <Minter /> */}
      {/* <Item id={NFTid}/> */}
      <Footer />
    </div>
  );
}

export default App;