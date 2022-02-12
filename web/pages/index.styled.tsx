import { defaultColours } from "fictoan-react";
import styled from "styled-components";

const IndexStyled = styled.div`
  .left-partition {
    background-color: black;
  }
  .right-partition {
    background-color: ${defaultColours.blue10};
    text-align: justify;
  }
  .left-banner {
    height: 12rem;
  }
  .right-banner {
    padding-left: 3rem;
    border-left: 2px solid white;
    height: 12rem;
  }
`;

export const MonitorStyled = (styled.div as any)`
  position:absolute;
  height:${(props: any) => props.height};
  width:${(props: any) => props.height};
  padding-top: 30px;
  transform: translate(
    ${(props: any) => props.x},
    ${(props: any) => props.y}
  );
  --ggs:7;
  div:nth-child(1) {
    background-color: ${(props: any) => props.color};
    height: 64%;
    width: 80%;
    margin: auto;
  }
  div:nth-child(2) {
    background-color: ${(props: any) => props.color};
    height: 16px;
    width: 10px;
    margin: auto;
  }
  div:nth-child(3) {
    background-color: ${(props: any) => props.color};
    height: 8px;
    width: 50%;
    margin: auto;
  }
  .gg-terminal {
    box-sizing: border-box;
    position: relative;
    display: block;
    transform: scale(var(--ggs)) translateY(3px);
    width: 24px;
    height: 20px;
    border: 2px solid;
    border-radius: 2px;
    margin:auto;
}
.gg-terminal::after,
.gg-terminal::before {
    content: "";
    display: block;
    box-sizing: border-box;
    position: absolute
}
.gg-terminal::before {
    border-right: 2px solid;
    border-bottom: 2px solid;
    transform: rotate(-45deg);
    width: 6px;
    height: 6px;
    top: 5px;
    left: 3px
}
.gg-terminal::after {
    width: 4px;
    height: 2px;
    background: currentColor;
    top: 10px;
    left: 11px
}
`;
export default IndexStyled;