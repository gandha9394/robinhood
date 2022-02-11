import styled from "styled-components";

export const CreateSignatureStyled = styled.div`

    .step-card summary::after {
        right  : 0;
        top    : 2px;
        width  : 12px;
        height : 12px;
    }

    .step-card details[open] summary::after {
        transform : rotateZ(225deg);
        top       : 3px;
    }

    .step-completeness-indicator svg {
        width      : 20px;
        height     : 20px;
        margin-top : 6px;
    }

    .colour-picker {
        height  : 32px;
        width   : 64px;
        padding : 0;
        border  : none;
        outline : none;
    }

    .colour-picker-card > div { width: auto; }
`;

