import styled from "styled-components";

export const ConfirmModalStyled = styled.div`
   position: fixed;
   top:0;
   left:0;
   height: 100%;
   width: 100%;
   z-index:10;
   background-color: #00000050;
   display: flex;
   justify-content: center;
   text-align: center;

   .confirm-card{
      height: 20%;
      width: 40%;
   }
`