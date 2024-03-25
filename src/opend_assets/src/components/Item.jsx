import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "../../../declarations/nft";
import { idlFactory as tokenIdlFactory } from "../../../declarations/token";
import { Principal } from "@dfinity/principal";
import Button from "./Button";
import { opend } from "../../../declarations/opend";
import CURRENT_USER_ID from "../index";
import PriceLabel from "./PriceLabel";
function Item(props) {

  const [name, setname] = useState();
  const [owner, setowner] = useState("");
  const [img, setimg] = useState("");
  const [button, setbutton] = useState("");
  const [priceInp, setpriceInp] = useState("");
  const [loaderhidden, setloaderhidden] = useState(true);
  const [blur, setblur] = useState();
  const [sellStatus, setsellStatus] = useState("");
  const [priceLabel, setpriceLabel] = useState();
  const [showdisp, setshowdisp] = useState(true);


  const id = props.id;

  const localhost = "http://localhost:8080/";
  const agent = new HttpAgent({ host: localhost });
  agent.fetchRootKey(); // only used for local development for live remove this 
  let NFTactor;

  async function loadNFT() {
    NFTactor = await Actor.createActor(idlFactory, {
      agent,
      canisterId: id,
    });

    const val1 = await NFTactor.img();
    const val2 = new Uint8Array(val1);
    const val3 = URL.createObjectURL(new Blob([val2.buffer], { type: "image/png" }))

    setname(await NFTactor.namer());
    setowner((await NFTactor.retOwn()).toText());
    setimg(val3);

    if (props.role == "collection") {
      const nftIsListed = await opend.isListed(id);
      if (nftIsListed) {
        setowner("OpenD");
        setblur({ filter: "blur(4px)" });
        setsellStatus("Listed");
      } else {
        setbutton(<Button handleClick={handleSell} text={"Sell"} />)
      }
    } else if (props.role == "discover") {
      const OriginalOwner = await opend.OriginalOwner(id);
      if (OriginalOwner.toText() != CURRENT_USER_ID.toText()) {
        setbutton(<Button handleClick={handleBuy} text={"Buy"} />)
      }

      const price = await opend.NFTprice(id);
      setpriceLabel(<PriceLabel sellPrice={price.toString()} />);

    }
  }

  useEffect(() => {
    loadNFT();
  }, []);

  let price;
  function handleSell() {
    console.log("hello");
    setpriceInp(<input
      placeholder="Price in AlphaCoin"
      type="number"
      className="price-input"
      value={price}
      onChange={(e) => price = e.target.value}
    />);
    setbutton(<Button handleClick={sellItem} text={"Confirm"} />)
  }

  async function sellItem() {
    setblur({ filter: "blur(4px)" });
    setloaderhidden(false);
    console.log("Set price = " + price);
    const Liasting = await opend.listItem(id, Number(price));
    console.log("Listing = " + Liasting);
    if (Liasting == "Success") {
      const opndId = await opend.OpenDCanisterID();
      const trnsferRes = await NFTactor.transfer(opndId);
      console.log(trnsferRes);
      if (trnsferRes == "Success") {
        setloaderhidden(true);
        setbutton();
        setpriceInp();
        setsellStatus("Listed");
        setowner("OpenD");
      }
    }
  }

  async function handleBuy() {
    console.log("buy");
    setloaderhidden(false);
    const tokenActor = await Actor.createActor(tokenIdlFactory, {
      agent,
      canisterId: Principal.fromText("renrk-eyaaa-aaaaa-aaada-cai"),
    });

    const sellerId = await opend.OriginalOwner(id);
    const itemPrice = await opend.NFTprice(id);

    const result = await tokenActor.transfer(sellerId, itemPrice);
    if (result == "Success") {
      const chec323 = await opend.completePurchase(id, sellerId, CURRENT_USER_ID);
      console.log("purchase : " + chec323);
      setloaderhidden(true);
      setshowdisp(false);
    }
  }

  return (
    <div style={{ display: showdisp ? "inline" : "none" }} className="disGrid-item">
      <div className="disPaper-root disCard-root makeStyles-root-17 disPaper-elevation1 disPaper-rounded">
        <img
          className="disCardMedia-root makeStyles-image-19 disCardMedia-media disCardMedia-img"
          src={img}
          style={blur}
        />
        <div className="lds-ellipsis" hidden={loaderhidden}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="disCardContent-root">
          {priceLabel}
          <h2 className="disTypography-root makeStyles-bodyText-24 disTypography-h5 disTypography-gutterBottom">
            {name}<span className="purple-text"> {sellStatus}</span>
          </h2>
          <p className="disTypography-root makeStyles-bodyText-24 disTypography-body2 disTypography-colorTextSecondary">
            Owner: {owner}
          </p>
          {priceInp}
          {button}
        </div>
      </div>
    </div>
  );
}

export default Item;
