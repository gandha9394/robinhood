import React from "react";
import { LoaderStyled } from "./Loader.styled";

function Loader() {
  return (
    <LoaderStyled>
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </LoaderStyled>
  );
}

export default Loader;
