import { defaultColours } from "fictoan-react";
import styled from "styled-components";
import { darken, lighten, transparentize } from "polished";

export const IndexStyled = styled.article`
    display               : grid;
    grid-template-columns : 1fr 1fr;
    grid-template-rows    : 120px 1fr;
    //grid-gap              : 32px;
    background-color      : ${darken(0.38, defaultColours.green)};
    padding-bottom        : 0;
    grid-template-areas   : 
            "header header"
            "donor consumer";

    @media all and (max-width : 960px) {
        display        : flex;
        flex-direction : column;
    }

    .panel {
        display        : flex;
        position       : relative;
        margin         : 32px;
        border         : 2px solid ${transparentize(0.32, defaultColours.green)};
        flex-direction : column;
    }

    .section-heading {
        text-transform : uppercase;
    }

    #page-header {
        grid-area : header;
        padding   : 32px;
    }

    .caret-blink {
        letter-spacing : -16px;
        color          : ${defaultColours.green};
        animation      : 1s blink infinite;
        transition     : all cubic-bezier(1, 0, 0, 1);
    }

    @keyframes blink {
        from { opacity : 0; }
        50% { opacity : 1; }
        to { opacity : 0; }
    }

    #donor-panel { margin-right : 16px; }

    #consumer-panel { margin-left : 16px; }

    .panel-heading {
        position         : absolute;
        top              : -16px;
        left             : 16px;
        background-color : ${darken(0.38, defaultColours.green)};
        padding          : 0 12px;
        text-transform   : uppercase;
    }

    #spec-list > div { margin-right : 40px; }


    .user-card {
        display               : grid;
        background-color      : ${darken(0.16, defaultColours.green)};
        grid-template-columns : 1fr;
        grid-template-rows    : auto 120px;
        grid-gap              : 1px;
        grid-template-areas   :
                "header"
                "panels";
    }

    .user-actions {
        display         : flex;
        justify-content : flex-end;
        align-items     : center;
    }

    .user-card .resource-action {
        display : none;
        cursor  : pointer;
    }

    .user-card:hover {
        outline : 1px solid ${defaultColours.green};
    }

    .user-card:hover .resource-action,
    .user-card:active .resource-action { display : block; }

    .user-subpanel { background-color : ${darken(0.38, defaultColours.green)}; }

    .panel-wrapper {
        display               : grid;
        grid-template-columns : repeat(4, 1fr);
        grid-gap              : 1px;
        background-color      : ${darken(0.38, defaultColours.green)};
    }

    .data-subpanel {
        display            : grid;
        grid-template-rows : auto 1fr;
        outline            : 1px solid ${darken(0.08, defaultColours.green)};
    }

    .dataviz-panel {
        display               : grid;
        grid-template-columns : repeat(10, 1fr);
    }

    .panel-label {
        position : relative;
        z-index  : 5000;
    }

    .usage-indicator {
        height           : 1px;
        display          : flex;
        align-self       : flex-end;
        background-color : ${darken(0.24, defaultColours.green)};
        transform-origin : center bottom;
    }

    #user-01 {
        .cpu-panel {
            .usage-indicator:nth-child(1) { transform : scaleY(1) }
            .usage-indicator:nth-child(2) { transform : scaleY(10) }
            .usage-indicator:nth-child(3) { transform : scaleY(100) }
            .usage-indicator:nth-child(4) { transform : scaleY(90) }
            .usage-indicator:nth-child(5) { transform : scaleY(56) }
            .usage-indicator:nth-child(6) { transform : scaleY(38) }
            .usage-indicator:nth-child(7) { transform : scaleY(30) }
            .usage-indicator:nth-child(8) { transform : scaleY(100) }
            .usage-indicator:nth-child(9) { transform : scaleY(93) }
            .usage-indicator:nth-child(10) { transform : scaleY(87) }
        }

        .ram-panel {
            .usage-indicator:nth-child(1) { transform : scaleY(1) }
            .usage-indicator:nth-child(2) { transform : scaleY(80) }
            .usage-indicator:nth-child(3) { transform : scaleY(80) }
            .usage-indicator:nth-child(4) { transform : scaleY(80) }
            .usage-indicator:nth-child(5) { transform : scaleY(80) }
            .usage-indicator:nth-child(6) { transform : scaleY(80) }
            .usage-indicator:nth-child(7) { transform : scaleY(80) }
            .usage-indicator:nth-child(8) { transform : scaleY(80) }
            .usage-indicator:nth-child(9) { transform : scaleY(80) }
            .usage-indicator:nth-child(10) { transform : scaleY(80) }
        }

        .ssd-panel {
            .usage-indicator:nth-child(1) { transform : scaleY(1) }
            .usage-indicator:nth-child(2) { transform : scaleY(40) }
            .usage-indicator:nth-child(3) { transform : scaleY(40) }
            .usage-indicator:nth-child(4) { transform : scaleY(40) }
            .usage-indicator:nth-child(5) { transform : scaleY(40) }
            .usage-indicator:nth-child(6) { transform : scaleY(70) }
            .usage-indicator:nth-child(7) { transform : scaleY(70) }
            .usage-indicator:nth-child(8) { transform : scaleY(70) }
            .usage-indicator:nth-child(9) { transform : scaleY(70) }
            .usage-indicator:nth-child(10) { transform : scaleY(70) }
        }

        .isp-panel {
            .usage-indicator:nth-child(1) { transform : scaleY(10) }
            .usage-indicator:nth-child(2) { transform : scaleY(100) }
            .usage-indicator:nth-child(3) { transform : scaleY(10) }
            .usage-indicator:nth-child(4) { transform : scaleY(10) }
            .usage-indicator:nth-child(5) { transform : scaleY(10) }
            .usage-indicator:nth-child(6) { transform : scaleY(1) }
            .usage-indicator:nth-child(7) { transform : scaleY(1) }
            .usage-indicator:nth-child(8) { transform : scaleY(40) }
            .usage-indicator:nth-child(9) { transform : scaleY(1) }
            .usage-indicator:nth-child(10) { transform : scaleY(1) }
        }
    }

    #user-02 {
        .cpu-panel {
            .usage-indicator:nth-child(1) { transform : scaleY(1) }
            .usage-indicator:nth-child(2) { transform : scaleY(34) }
            .usage-indicator:nth-child(3) { transform : scaleY(43) }
            .usage-indicator:nth-child(4) { transform : scaleY(65) }
            .usage-indicator:nth-child(5) { transform : scaleY(38) }
            .usage-indicator:nth-child(6) { transform : scaleY(78) }
            .usage-indicator:nth-child(7) { transform : scaleY(48) }
            .usage-indicator:nth-child(8) { transform : scaleY(22) }
            .usage-indicator:nth-child(9) { transform : scaleY(86) }
            .usage-indicator:nth-child(10) { transform : scaleY(36) }
        }

        .ram-panel {
            .usage-indicator:nth-child(1) { transform : scaleY(100) }
            .usage-indicator:nth-child(2) { transform : scaleY(45) }
            .usage-indicator:nth-child(3) { transform : scaleY(83) }
            .usage-indicator:nth-child(4) { transform : scaleY(82) }
            .usage-indicator:nth-child(5) { transform : scaleY(95) }
            .usage-indicator:nth-child(6) { transform : scaleY(22) }
            .usage-indicator:nth-child(7) { transform : scaleY(26) }
            .usage-indicator:nth-child(8) { transform : scaleY(82) }
            .usage-indicator:nth-child(9) { transform : scaleY(48) }
            .usage-indicator:nth-child(10) { transform : scaleY(91) }
        }

        .ssd-panel {
            .usage-indicator:nth-child(1) { transform : scaleY(40) }
            .usage-indicator:nth-child(2) { transform : scaleY(06) }
            .usage-indicator:nth-child(3) { transform : scaleY(06) }
            .usage-indicator:nth-child(4) { transform : scaleY(06) }
            .usage-indicator:nth-child(5) { transform : scaleY(06) }
            .usage-indicator:nth-child(6) { transform : scaleY(08) }
            .usage-indicator:nth-child(7) { transform : scaleY(08) }
            .usage-indicator:nth-child(8) { transform : scaleY(08) }
            .usage-indicator:nth-child(9) { transform : scaleY(08) }
            .usage-indicator:nth-child(10) { transform : scaleY(08) }
        }

        .isp-panel {
            .usage-indicator:nth-child(1) { transform : scaleY(10) }
            .usage-indicator:nth-child(2) { transform : scaleY(04) }
            .usage-indicator:nth-child(3) { transform : scaleY(10) }
            .usage-indicator:nth-child(4) { transform : scaleY(10) }
            .usage-indicator:nth-child(5) { transform : scaleY(03) }
            .usage-indicator:nth-child(6) { transform : scaleY(1) }
            .usage-indicator:nth-child(7) { transform : scaleY(1) }
            .usage-indicator:nth-child(8) { transform : scaleY(06) }
            .usage-indicator:nth-child(9) { transform : scaleY(12) }
            .usage-indicator:nth-child(10) { transform : scaleY(19) }
        }
    }

    #user-03 {
        .cpu-panel {
            .usage-indicator:nth-child(1) { transform : scaleY(39) }
            .usage-indicator:nth-child(2) { transform : scaleY(67) }
            .usage-indicator:nth-child(3) { transform : scaleY(32) }
            .usage-indicator:nth-child(4) { transform : scaleY(00) }
            .usage-indicator:nth-child(5) { transform : scaleY(23) }
            .usage-indicator:nth-child(6) { transform : scaleY(28) }
            .usage-indicator:nth-child(7) { transform : scaleY(83) }
            .usage-indicator:nth-child(8) { transform : scaleY(62) }
            .usage-indicator:nth-child(9) { transform : scaleY(71) }
            .usage-indicator:nth-child(10) { transform : scaleY(77) }
        }

        .ram-panel {
            .usage-indicator:nth-child(1) { transform : scaleY(100) }
            .usage-indicator:nth-child(2) { transform : scaleY(45) }
            .usage-indicator:nth-child(3) { transform : scaleY(83) }
            .usage-indicator:nth-child(4) { transform : scaleY(82) }
            .usage-indicator:nth-child(5) { transform : scaleY(95) }
            .usage-indicator:nth-child(6) { transform : scaleY(22) }
            .usage-indicator:nth-child(7) { transform : scaleY(00) }
            .usage-indicator:nth-child(8) { transform : scaleY(00) }
            .usage-indicator:nth-child(9) { transform : scaleY(48) }
            .usage-indicator:nth-child(10) { transform : scaleY(91) }
        }

        .ssd-panel {
            .usage-indicator:nth-child(1) { transform : scaleY(40) }
            .usage-indicator:nth-child(2) { transform : scaleY(06) }
            .usage-indicator:nth-child(3) { transform : scaleY(06) }
            .usage-indicator:nth-child(4) { transform : scaleY(06) }
            .usage-indicator:nth-child(5) { transform : scaleY(34) }
            .usage-indicator:nth-child(6) { transform : scaleY(67) }
            .usage-indicator:nth-child(7) { transform : scaleY(78) }
            .usage-indicator:nth-child(8) { transform : scaleY(34) }
            .usage-indicator:nth-child(9) { transform : scaleY(08) }
            .usage-indicator:nth-child(10) { transform : scaleY(08) }
        }

        .isp-panel {
            .usage-indicator:nth-child(1) { transform : scaleY(94) }
            .usage-indicator:nth-child(2) { transform : scaleY(72) }
            .usage-indicator:nth-child(3) { transform : scaleY(33) }
            .usage-indicator:nth-child(4) { transform : scaleY(96) }
            .usage-indicator:nth-child(5) { transform : scaleY(51) }
            .usage-indicator:nth-child(6) { transform : scaleY(62) }
            .usage-indicator:nth-child(7) { transform : scaleY(67) }
            .usage-indicator:nth-child(8) { transform : scaleY(32) }
            .usage-indicator:nth-child(9) { transform : scaleY(78) }
            .usage-indicator:nth-child(10) { transform : scaleY(24) }
        }
    }

    //  CONSUMER PANEL  ///////////////////////////////////////////////////////
    .machine-card .resource-action {
        display : none;
        cursor  : pointer;
    }

    .machine-card { outline : 1px solid ${darken(0.12, defaultColours.green)}; }
    .machine-card:hover { outline : 1px solid ${defaultColours.green}; }

    .machine-card:hover .resource-action,
    .machine-card:active .resource-action { display : block; }

    .machine-specs {
        display               : grid;
        grid-template-columns : repeat(4, 1fr);
        grid-template-rows    : repeat(2, 40px);
        grid-gap              : 1px;
        background-color      : ${darken(0.38, defaultColours.green)};
    }

    .spec-card {
        padding : 0 24px;
        outline : 1px solid ${darken(0.24, defaultColours.green)};
    }
`
