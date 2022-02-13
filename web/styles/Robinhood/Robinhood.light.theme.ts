import { defaultColours } from "fictoan-react";
import { darken, lighten, transparentize } from "polished";
import { DefaultTheme as BridgeThemeType } from "styled-components";

import { setuColours } from "./SetuColours";

export const RobinhoodLightTheme: BridgeThemeType = {
    body : {
        bg : setuColours.pearlyCoke,
    },

    //  TEXT  /////////////////////////////////////////////////////////////////
    text : {
        font      : {
            sans : "Anonymous Pro",
            mono : "Functor Mono Sharp",
        },
        paras     : {
            font       : "Functor Mono Sharp",
            color      : `${lighten(0.16, setuColours.murkyNight)}`,
            lineHeight : 1.44,
            size       : 0.96,
            subtext    : defaultColours.slate80,
        },
        headings  : {
            font       : "Functor Mono Sharp",
            weight     : 400,
            lineHeight : 1.2,
            color      : setuColours.murkyNight,
            multiplier : 1.16,
        },
        links     : {
            default : {
                color : defaultColours.blue90,
            },
            onHover : {
                color : defaultColours.blue60,
            },
        },
        selection : {
            bg   : setuColours.flashTurk,
            text : setuColours.murkyNight,
        },
        code      : {
            inline : {
                bg    : `${lighten(0.16, setuColours.salmonRouge)}`,
                text  : setuColours.deepPurple,
                scale : 80,
            },
            block  : {
                bg : defaultColours.slate10,
            },
            prism  : {
                tokens : {
                    plain : defaultColours.grey,

                }
            }
        },
    },

    //  CARD  /////////////////////////////////////////////////////////////////
    card : {
        bg           : defaultColours.white,
        border       : defaultColours.slate20,
        borderRadius : "4px"
    },

    //  INPUT  ////////////////////////////////////////////////////////////////
    input : {
        default     : {
            bg     : defaultColours.white,
            border : defaultColours.slate40,
            label  : setuColours.murkyNight,
            text   : setuColours.murkyNight,
        },
        onFocus     : {
            bg       : defaultColours.white,
            border   : setuColours.flashTurk,
            text     : setuColours.murkyNight,
            helpText : setuColours.murkyNight,
        },
        isValid     : {
            bg     : defaultColours.white,
            border : defaultColours.green80,
            label  : setuColours.murkyNight,
        },
        isInvalid   : {
            bg       : defaultColours.red10,
            border   : defaultColours.red80,
            label    : defaultColours.red,
            helpText : defaultColours.red,
        },
        isReadOnly  : {
            bg     : defaultColours.grey50,
            border : defaultColours.grey50,
            label  : setuColours.murkyNight,
        },
        required    : {
            text : defaultColours.red,
        },
        icons       : {
            default : {
                fill : defaultColours.slate30,
            },
            onFocus : {
                fill : setuColours.flashTurk,
            },
            isValid : {
                bg     : defaultColours.grey50,
                border : defaultColours.red30,
            },
        },
        select      : {
            chevron : setuColours.flashTurk,
        },
        radioButton : {
            inset  : {
                default    : {
                    bg : defaultColours.slate20
                },
                onHover    : {
                    bg : defaultColours.slate40
                },
                isSelected : {
                    bg : setuColours.flashTurk
                },
                isDisabled : {
                    bg : defaultColours.slate10
                }
            },
            circle : {
                default : {
                    bg : defaultColours.white
                },
            }
        },

        checkBox : {
            square : {
                default    : {
                    bg : defaultColours.slate20
                },
                onHover    : {
                    bg : defaultColours.slate40
                },
                isChecked  : {
                    bg : setuColours.flashTurk
                },
                isDisabled : {
                    bg : defaultColours.slate10
                }
            },
            check  : {
                default : {
                    border : defaultColours.white
                },
            }
        },

        toggleSwitch : {
            switch : {
                default   : {
                    bg : defaultColours.white
                },
                isChecked : {
                    bg : defaultColours.white
                }
            }
        }
    },

    //  BUTTON  ///////////////////////////////////////////////////////////////
    button : {
        font      : "Montserrat",
        primary   : {
            default   : {
                bg           : `${darken(0.08, setuColours.murkyNight)}`,
                border       : `${darken(0.08, setuColours.murkyNight)}`,
                text         : defaultColours.white,
                borderRadius : "4px",
            },
            onHover   : {
                bg     : `${lighten(0.08, setuColours.crackedYolk)}`,
                border : `${lighten(0.08, setuColours.crackedYolk)}`,
                text   : defaultColours.black,
            },
            isActive  : {
                bg     : setuColours.flashTurk,
                border : setuColours.flashTurk,
                text   : defaultColours.white,
            },
            isLoading : {
                bg            : setuColours.flashTurk,
                spinnerBorder : defaultColours.black,
            },
        },
        secondary : {
            default   : {
                bg           : "#e6f1ff",
                border       : 'none',
                text         : `${lighten(0.08, setuColours.azureBlue)}`,
                borderRadius : "4px",
            },
            onHover   : {
                bg     : "#e6f1ff",
                border : 'none',
                text   : setuColours.flashTurk,
            },
            isActive  : {
                bg     : `${darken(0.32, setuColours.flashTurk)}`,
                border : setuColours.flashTurk,
                text   : setuColours.flashTurk,
            },
            isLoading : {
                bg            : defaultColours.white,
                spinnerBorder : defaultColours.black,
            },
        },
    },

    //  PROGRESS BAR  /////////////////////////////////////////////////////////
    progressBar : {
        height : 8,
        bg     : defaultColours.slate20,
        fill   : defaultColours.green80,
    },

    //  TABLE  ////////////////////////////////////////////////////////////////
    table : {
        bg      : defaultColours.white,
        text    : setuColours.murkyNight,
        border  : defaultColours.slate20,
        striped : {
            header : {
                bg : defaultColours.teal40,
            },
            cell   : {
                bg : defaultColours.grey10,
            },
        },
        onHover : {
            bg   : defaultColours.amber20,
            text : setuColours.murkyNight,
        },
    },

    tablePagination : {
        bg   : defaultColours.white,
        text : setuColours.murkyNight,
        svg  : {
            onHover : {
                stroke : lighten(0.16, setuColours.flashTurk),
            }
        }
    },

    //  RULE  /////////////////////////////////////////////////////////////////
    hr : {
        primary   : {
            bg     : `${darken(0.24, setuColours.pearlyCoke)}`,
            height : "1px",
        },
        secondary : {
            bg     : `${darken(0.16, setuColours.pearlyCoke)}`,
            height : "1px",
        },
        tertiary  : {
            bg     : `${darken(0.08, setuColours.pearlyCoke)}`,
            height : "1px",
        },
    },

    //  INFO PANEL  ///////////////////////////////////////////////////////////
    infoPanel : {
        bg            : defaultColours.white,
        border        : defaultColours.slate20,
        dismissButton : {
            bg      : `${transparentize(0.32, defaultColours.slate10)}`,
            color   : defaultColours.slate90,
            content : "×"
        }
    },


    ///////////////////////////////////////////////////////////////////////////
    //  CUSTOM COMPONENTS
    ///////////////////////////////////////////////////////////////////////////

    //  BRIDGE INTRO  /////////////////////////////////////////////////////////
    BridgeIntro : {
        modal     : {
            explanation : {
                bg : defaultColours.white
            },
            image       : {
                bg : defaultColours.slate10
            },
            label       : {
                text : `${lighten(0.16, setuColours.murkyNight)}`,
            }
        },
        indicator : {
            default  : {
                bg : defaultColours.slate20
            },
            selected : {
                bg : setuColours.flashTurk
            }
        },
        overlay   : {
            bg : `${transparentize(0.24, setuColours.murkyNight)}`,
        }
    },

    //  LOADER CARD  /////////////////////////////////////////////////////
    LoaderCard : {
        bg      : `${darken(0.02, setuColours.pearlyCoke)}`,
        overlay : `${darken(0.04, setuColours.pearlyCoke)}`
    },

    //  PRODUCT CARD  /////////////////////////////////////////////////////////
    ProductCard : {
        icon  : {
            bg     : defaultColours.teal20,
            stroke : setuColours.flashTurk
        },
        title : {
            onHover : {
                text : setuColours.flashTurk
            }
        },
        meta  : {
            text : defaultColours.slate80
        },
        flags : {
            comingSoon   : {
                text : defaultColours.blue,
                bg   : defaultColours.sky60
            },
            earlyPreview : {
                text : defaultColours.violet,
                bg   : defaultColours.violet20
            }
        }
    },

    //  PRODUCT CARD  /////////////////////////////////////////////////////////
    ActiveProductCard : {
        meta       : {
            text : defaultColours.slate80
        },
        sandbox    : {
            border : `${transparentize(0.56, defaultColours.orange80)}`,
            icon   : {
                bg     : defaultColours.orange10,
                stroke : defaultColours.orange80
            },
            status : {
                text : defaultColours.orange,
                bg   : defaultColours.orange10
            }
        },
        production : {
            border : `${transparentize(0.56, defaultColours.green80)}`,
            icon   : {
                bg     : defaultColours.green20,
                stroke : defaultColours.green80
            },
            status : {
                text : defaultColours.green80,
                bg   : defaultColours.green20
            }
        }
    },

    //  PLUGIN CARD  //////////////////////////////////////////////////////////
    PluginCard : {
        icon  : {
            bg     : defaultColours.teal10,
            stroke : setuColours.fadedMing
        },
        title : {
            onHover : {
                text : setuColours.flashTurk
            }
        },
        flags : {
            comingSoon   : {
                text : defaultColours.blue,
                bg   : defaultColours.sky60
            },
            earlyPreview : {
                text : defaultColours.violet,
                bg   : defaultColours.violet20
            }
        }
    },

    //  SIDEBAR  //////////////////////////////////////////////////////////////
    Sidebar : {
        icon  : {
            default : {
                stroke : defaultColours.slate60
            },
            onHover : {
                stroke : `${lighten(0.16, setuColours.flashTurk)}`
            },
            active  : {
                stroke : setuColours.flashTurk
            }
        },
        label : {
            default : {
                bg   : `${darken(0.02, setuColours.pearlyCoke)}`,
                text : `${lighten(0.64, setuColours.murkyNight)}`
            },
            onHover : {
                bg   : defaultColours.white,
                text : setuColours.murkyNight
            },
        }
    },

    //  INACTIVE OBJECTS  /////////////////////////////////////////////////////
    Inactive : {
        bg     : `${darken(0.08, setuColours.pearlyCoke)}`,
        border : defaultColours.slate30,
    },

    //  EMPTY CARD  ///////////////////////////////////////////////////////////
    PlaceholderCard : {
        border : defaultColours.slate20,
    },

    //  TABS  ////////////////////////////////////////////////////////////////
    tabs : {
        label : {
            default    : {
                text : `${lighten(0.16, setuColours.murkyNight)}`,
            },
            onHover    : {
                text : `${lighten(0.16, setuColours.flashTurk)}`
            },
            isActive   : {
                border : setuColours.flashTurk,
                text   : setuColours.flashTurk
            },
            isDisabled : {
                text : `${darken(0.24, setuColours.pearlyCoke)}`,
            },
            hasAlert   : {
                circle : {
                    bg     : defaultColours.red90,
                    border : setuColours.pearlyCoke
                }
            },
        }
    },

    //  STICKY HEADER  ////////////////////////////////////////////////////////
    StickyHeader : {
        bg     : defaultColours.white,
        border : defaultColours.slate20,
    },

    //  REPORTS TABLE  ////////////////////////////////////////////////////////
    ReportsTable : {
        selectedRow : {
            bg : setuColours.flashTurk,
        }
    },

    //  SESSION LOCK MODAL  ///////////////////////////////////////////////////
    SessionLockModal : {
        modal   : {
            explanation : {
                bg : defaultColours.white
            },
            image       : {
                bg : defaultColours.slate10
            }
        },
        overlay : {
            bg : `${transparentize(0.24, setuColours.murkyNight)}`,
        }
    },

    //  MULTI-SELECT BUTTONS  /////////////////////////////////////////////////
    MultiSelectButtons : {
        default    : {
            bg   : defaultColours.slate10,
            text : defaultColours.slate
        },
        selected   : {
            bg        : defaultColours.slate10,
            text      : defaultColours.slate,
            border    : defaultColours.teal,
            crossMark : defaultColours.teal
        },
        unselected : {
            bg        : defaultColours.red10,
            text      : defaultColours.slate,
            border    : defaultColours.red90,
            crossMark : defaultColours.red90
        },
        applied    : {
            bg   : defaultColours.teal20,
            text : defaultColours.teal
        }
    },

    // MULTI-SELECT DROPDOWN //////////////////////////////////////////////////
    MultiSelectDropDownTheme : {
        neutral5  : defaultColours.teal20,
        neutral0  : defaultColours.white,
        neutral10 : defaultColours.teal20,
        neutral20 : defaultColours.slate40,
        neutral30 : defaultColours.slate40,
        neutral50 : defaultColours.slate60,
        neutral80 : defaultColours.teal,
        primary   : setuColours.flashTurk,
        primary25 : `${lighten(0.24, setuColours.flashTurk)}`,
    },

    MultiSelectDropDown : {
        option : {
            text    : setuColours.murkyNight,
            onHover : setuColours.murkyNight
        }
    },

    // DATE PICKER ////////////////////////////////////////////////////////////
    DateRangePickerTheme : {
        white        : defaultColours.white,
        blue         : setuColours.azureBlue,
        gray         : "#484848",
        grayLight    : "#82888a",
        grayLighter  : "#cacccd",
        grayLightest : '#f2f2f2',

        borderMedium  : '#c4c4c4',
        border        : "dbdbdb",
        borderLight   : '#e4e7e7',
        borderLighter : '#eceeee',
        borderBright  : '#f4f5f5',

        primary        : "#00a699",
        primaryShade_1 : '#33dacd',
        primaryShade_2 : '#66e2da',
        primaryShade_3 : '#80e8e0',
        primaryShade_4 : '#b2f1ec',
        primary_dark   : '#008489',

        secondary : '#007a87',

        yellow      : '#ffe8bc',
        yellow_dark : '#ffce71',
    },


    // SPLIT SETTLEMENTS //////////////////////////////////////////////////////
    SplitSettlement : {
        parent : {
            bg : `${darken(0.04, setuColours.pearlyCoke)}`,
        },
        card   : {
            bg : `${darken(0.01, setuColours.pearlyCoke)}`,
        },
        line   : {
            bg : `${darken(0.24, setuColours.pearlyCoke)}`,
        }
    },

    // MOBILE PHONE COMPONENT //////////////////////////////////////////////////////
    MobilePhone : {
        topBar  : {
            bg   : `${setuColours.fadedMing}`,
            text : `${defaultColours.white}`
        },
        content : {
            bg   : `${defaultColours.white}`,
            text : `${defaultColours.slate}`
        }
    },

    //  TOP NAV  //////////////////////////////////////////////////////////////
    TopNav : {
        bg     : defaultColours.white,
        border : defaultColours.slate20,

        Link : {
            default : {
                bg   : defaultColours.white,
                text : setuColours.azureBlue,
            },
            onHover : {
                bg   : `${lighten(0.32, setuColours.crackedYolk)}`,
                text : setuColours.azureBlue,
            },
        }
    },

};
