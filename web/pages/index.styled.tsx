import { defaultColours } from "fictoan-react";
import styled from "styled-components";

export const IndexStyled = styled.div`
  .left-partition {
    background-color: black;
  }
  .right-partition {
    background-color: ${defaultColours.blue10};
  }
  .left-banner {
    height: 12rem;
    text-align: center;
    padding-top: 30px;
  div:nth-child(1) {
      background-color: #ff6600;
      height: 60%;
      width: 80%;
      margin:auto;
    }
  div:nth-child(2) {
      background-color: #ff6600;
      height: 16px;
      width: 10px;
      margin:auto;
    }
  div:nth-child(3) {
      background-color: #ff6600;
      height: 8px;
      width: 50%;
      margin:auto;
    }
  }
  .right-banner {
    padding-left: 3rem;
    border-left: 2px solid white;
    height: 12rem;
  }
`;
