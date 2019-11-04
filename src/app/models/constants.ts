export enum LAYER { OPTICAL, LAYER1, IP }
export enum DISPLAY_MODE {D2 = 0, D3 = 1, ONGOING = 2, D2WORLD = 3}
export enum NODE_LEVEL {CITY, STATE, COUNTRY}
export enum LINK_TYPE {DOMAIN, BOUNDARY}
export const CONSTANTS = {
    HIGHLIGHTED_LINK_PREFIX: "hl",
    COUNTRY_PAR: ['assets/images/world-data-center.png', 
                        'assets/images/world-data-center-hover.png',
                        'assets/images/world-data-center-selected.png', [36, 36],
                        0x008000, 0x008000],

    STATE_PAR:   ['assets/images/country-switch.png', 
                        'assets/images/country-switch-hover.png',
                        'assets/images/country-switch-selected.png', [20, 20],
                        0x0080ff, 0x404040],
    CITY_PAR:    ['assets/images/router.png', 
                        'assets/images/router-hover.png',
                        'assets/images/router-selected.png', [6, 6]
                        , 0x4B0082, 0x400080],
    PLANE_SIZE:     [25, 20],
    LINK_DOMAIN:    [0xffff00, 0xc0392b, 0x81261d],
    LINK_BOUNDARY:    [0xffff00, 0x66C6C, 0x3da39c]
}