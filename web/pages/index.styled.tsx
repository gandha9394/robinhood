import { defaultColours } from "fictoan-react";
import styled from "styled-components";
import { darken } from "polished";

export const IndexStyled = styled.article`
    display               : grid;
    grid-template-columns : 1fr 1fr;
    grid-template-rows    : 160px 1fr;
    //grid-gap              : 32px;
    background-color      : ${darken(0.38, defaultColours.green)};
    padding-bottom        : 0;
    grid-template-areas   : 
            "header header"
            "donor consumer";

    .panel {
        display  : flex;
        position : relative;
        margin   : 32px;
        border   : 2px solid ${darken(0.24, defaultColours.green)};
    }

    #page-header { grid-area : header; }

    .blinking-cursor {
        letter-spacing : -16px;
        color          : ${defaultColours.green};
        animation      : 1s blink step-end infinite;
    }

    @keyframes blink {
        from, to { color : transparent; }
        50% { color : ${defaultColours.green}; }
    }

    #donor-panel {
        margin-right : 16px;
    }

    #consumer-panel {
        margin-left : 16px;
    }

    .panel-heading {
        position         : absolute;
        top              : -16px;
        left             : 32px;
        background-color : ${darken(0.38, defaultColours.green)};
        padding          : 0 12px;
    }
`;
