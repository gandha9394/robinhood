import styled from "styled-components";

export const PreviewStyled = styled.div`
   height: 100%;
   .pdf-container{
      overflow-y: scroll;
   }
   .sticky-bottom{
      position: fixed;
      bottom: 0;
      left: 0;
   }
   .download-btn-container{
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
   }
`