import { GLinkOBJ } from './2d-object/glinkobj';
import { GNObject2D, PathStruct } from './2d-object/gnobject2D';
import { GPOjbect } from './2d-object/gpobject';

export enum LAYER { OPTICAL, LAYER1, IP }
export enum DISPLAY_MODE {D2 = 0, D3 = 1, ONGOING = 2, D2WORLD = 3}
export enum NODE_LEVEL {CITY, STATE, COUNTRY}
export enum LINK_TYPE {DOMAIN, BOUNDARY}
export const CONSTANTS = {
    HIGHLIGHTED_LINK_PREFIX: "hl",
    HIGHLIGHTED_PATH_PREFIX: "hp",
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

export const GNOs: GNObject2D[] = [
    new GNObject2D ('gnobject2d1', 'qfx1', 'EDTNLABQFX-01', NODE_LEVEL.COUNTRY, [-135, 65], ['1', '2', '3']),
    new GNObject2D ('gnobject2d2', 'qfx2', 'EDTNLABQFX-02', NODE_LEVEL.COUNTRY, [-78, 60], ['1', '2', '3']),
    new GNObject2D ('gnobject2d3', 'qfx3', 'EDTNLABQFX-03', NODE_LEVEL.COUNTRY, [-118, 56], ['1', '2', '3']),
    new GNObject2D ('gnobject2d4', 'qfx4', 'EDTNLABQFX-04', NODE_LEVEL.COUNTRY, [-98, 55], ['1', '2', '3']),
    new GNObject2D ('gnobject2d5', 'fws1', 'FW9500-SITE1', NODE_LEVEL.STATE, [-140, 65], ['1', '2', '3']),
    new GNObject2D ('gnobject2d6', 'fws2', 'FW9500-SITE2', NODE_LEVEL.STATE, [-128, 58], ['1', '2', '3']),
    new GNObject2D ('gnobject2d7', 'fws3', 'FW9500-SITE3', NODE_LEVEL.STATE, [-109, 56], ['1', '2', '3']),
    new GNObject2D ('gnobject2d8', 'fws4', 'FW9500-SITE4', NODE_LEVEL.STATE, [-100, 59], ['1', '2', '3']),
    new GNObject2D ('gnobject2d9', 'fws5', 'FW9500-SITE5', NODE_LEVEL.STATE, [-118, 54], ['1', '2', '3']),
    new GNObject2D ('gnobject2d10', 'fws6', 'FW9500-SITE6', NODE_LEVEL.STATE, [-130, 69], ['1', '2', '3']),
    new GNObject2D ('gnobject2d11', 'TCO', 'ThunderBay CO', NODE_LEVEL.STATE, [-90, 52], ['1', '2', '3']),
    new GNObject2D ('gnobject2d12', 'MCO', 'Montreal CO', NODE_LEVEL.STATE, [-78, 50], ['1', '2', '3']),
    new GNObject2D ('gnobject2d13', 'LCO', 'Laval CO', NODE_LEVEL.STATE, [-75, 57], ['1', '2', '3']),
    new GNObject2D ('gnobject2d14', 'RCO', 'Rankin CO', NODE_LEVEL.STATE, [-100, 65], ['1', '2', '3']),
    new GNObject2D ('gnobject2d15', 'FCO', 'Fort CO', NODE_LEVEL.STATE, [-115, 64], ['1', '2', '3']),
    new GNObject2D ('gnobject2d16', 'poc1', 'EDTNLABPOC-01', NODE_LEVEL.CITY, [-113, 55], ['1', '2', '3']),
    new GNObject2D ('gnobject2d17', 'poc2', 'EDTNLABPOC-02', NODE_LEVEL.CITY, [-117, 53], ['1', '2', '3']),
    new GNObject2D ('gnobject2d18', 'poc3', 'EDTNLABPOC-03', NODE_LEVEL.CITY, [-115, 59], ['1', '2', '3'])
  ];

export const GLOs: GLinkOBJ[] = [
    new GLinkOBJ ('GLinkOBJ1', 'QFX1-3', '#009432', 3, GNOs[0], '48', GNOs[2], '49', '100Gbe', '0.1ms', LINK_TYPE.DOMAIN, [60, 40], ["IP", "Unused"], true),
    new GLinkOBJ ('GLinkOBJ2', 'QFX2-4', '#009432', 3, GNOs[1], '48', GNOs[3], '49', '100Gbe', '0.5ms', LINK_TYPE.DOMAIN,[30, 70], ["IP", "Unused"], true),
    new GLinkOBJ ('GLinkOBJ3', 'QFX3-4', '#009432', 3, GNOs[2], '48', GNOs[3], '48',  '40Gbe', '0.3ms', LINK_TYPE.DOMAIN, [20, 80], ["IP", "Unused"], true),
    new GLinkOBJ ('GLinkOBJ4', 'QFX3-4', '#009432', 3, GNOs[2], '50', GNOs[3], '50',  '100Gbe', '1.0ms', LINK_TYPE.DOMAIN, [90, 10], ["IP", "Unused"], true),
    new GLinkOBJ ('GLinkOBJ5', 'SITE1-2', '#009432', 3, GNOs[4], '1-5-1', GNOs[5], '1-5-1', 'OTU4', '0.01ms', LINK_TYPE.DOMAIN, [20, 30, 50, 40, 15], ['Service A', 'Service B', 'Service C', 'Service D', 'Service E'], true),
    new GLinkOBJ ('GLinkOBJ6', 'SITE1-4', '#009432', 3, GNOs[4], '1-6-2', GNOs[7], '1-6-2', 'OTU4', '0.1ms', LINK_TYPE.DOMAIN, [20, 80], ["Service 1", "Service 2"], true),
    new GLinkOBJ ('GLinkOBJ7', 'SITE2-4', '#009432', 3, GNOs[5], '1-6-1', GNOs[7], '1-6-1', 'OTU4', '0.3ms', LINK_TYPE.DOMAIN, [32, 50, 21], ["IP", "MPLS", "Others"], true),
    new GLinkOBJ ('GLinkOBJ8', 'SITE2-3', '#009432', 3, GNOs[5], '1-6-2', GNOs[6], '1-6-2', 'OTU4', '0.5ms', LINK_TYPE.DOMAIN, [10, 50, 40], ["IP", "MPLS", "Others"], true),
    new GLinkOBJ ('GLinkOBJ9', 'SITE3-4', '#009432', 3, GNOs[6], '1-5-1', GNOs[7], '1-5-1', 'OTU4', '0.7ms', LINK_TYPE.DOMAIN, [30, 30, 30], ["IP", "MPLS", "Others"], true),
    new GLinkOBJ ('GLinkOBJ10', 'POC1-2', '#009432', 0.5, GNOs[15], '1-1-1', GNOs[16], '1-1-2', 'OCH', '0.9ms', LINK_TYPE.DOMAIN, [20, 30, 50], ["Service 1", "Service 2", "Service 3"], true),
    new GLinkOBJ ('GLinkOBJ11', 'POC1-3', '#009432', 0.5, GNOs[15], '1-5-2', GNOs[17], '1-1-1', 'OCH', '1.1ms', LINK_TYPE.DOMAIN, [10, 20, 30, 40], ['Service Cienna', 'Service Virtuora', 'Service NorthStar', 'Service Synchro'], true),
    new GLinkOBJ ('GLinkOBJ12', 'POC2-3', '#009432', 0.5, GNOs[16], '1-5-1', GNOs[17], '1-5-1', 'OCH', '2.1ms', LINK_TYPE.DOMAIN, [30, 70], ["Service 1", "Service 2"], true),

    new GLinkOBJ ('GLinkOBJ13', 'QFX1-SITE1', '#009432', 3, GNOs[0], '47', GNOs[4], '1-1-1', '10GbE', '1.3ms', LINK_TYPE.BOUNDARY, [20, 20, 60], ["IP", "MPLS", "Others"], true),
    new GLinkOBJ ('GLinkOBJ14', 'QFX1-POC1', '#009432', 3, GNOs[0], '50', GNOs[15], '1-14-2', '100GbE', '0.1ms', LINK_TYPE.BOUNDARY, [10, 54, 60], ["IP", "MPLS", "Others"], true),
    new GLinkOBJ ('GLinkOBJ15', 'QFX2-SITE3', '#009432', 3, GNOs[1], '47', GNOs[6], '1-1-1', '10GbE', '0.8ms', LINK_TYPE.BOUNDARY, [20, 12, 65], ["IP", "MPLS", "Others"], true),
    new GLinkOBJ ('GLinkOBJ16', 'QFX2-POC3', '#009432', 3, GNOs[1], '50', GNOs[17], '1-14-2', '100GbE', '1.5ms', LINK_TYPE.BOUNDARY, [56, 80, 40], ["IP", "MPLS", "Others"], true),
    new GLinkOBJ ('GLinkOBJ17', 'SITE1-POC1', '#009432', 3, GNOs[4], '1-6-1', GNOs[15], '1-12-1', 'OTU4', '1.3ms', LINK_TYPE.BOUNDARY, [45, 60, 50], ["IP", "MPLS", "Others"], true),
    new GLinkOBJ ('GLinkOBJ18', 'SITE3-POC3', '#009432', 3, GNOs[6], '1-6-1', GNOs[17], '1-12-1', 'OTU4', '3.1ms', LINK_TYPE.BOUNDARY, [68, 97, 12], ["IP", "MPLS", "Others"], true),

    new GLinkOBJ ('GLinkOBJ19', 'SITE1-3', '#009432', 3, GNOs[4], '1-1-2', GNOs[6], '1-1-2', '10GbE', '1.1ms', LINK_TYPE.DOMAIN, [20, 54, 60], ["IP", "MPLS", "Others"], true),
    new GLinkOBJ ('GLinkOBJ20', 'QFX1-2', '#009432', 3, GNOs[0], '48', GNOs[1], '48', '100Gbe', '0.1ms', LINK_TYPE.DOMAIN, [60, 40], ["IP", "Unused"], false)
];

export const Paths: PathStruct[] = [
    {name: 'SYNCHRO-QFX12-l2', nodes: [GNOs[0], GNOs[2], GNOs[3], GNOs[1]], capacity: '10Gbps'}, //qfx1 -> qfx3 -> qfx4 -> qfx2 
    {name: 'SYNCHRO-QFX12-l20', nodes: [GNOs[0], GNOs[15], GNOs[17], GNOs[1]], capacity: '10Gbps'}, //qfx1 -> poc1 -> poc3 -> qfx2
    {name: 'SYNCHRO-QFX12-l21', nodes: [GNOs[0], GNOs[4], GNOs[7], GNOs[6], GNOs[1]], capacity: '10Gbps'}, //qfx1 -> fws1 -> fws4 -> fws3 -> qfx2
    {name: 'SYNCHRO-QFX12-l21-alter', nodes: [GNOs[0], GNOs[4], GNOs[5], GNOs[6], GNOs[1]], capacity: '10Gbps'}, //qfx1 -> fws1 -> fws2 -> fws3 -> qfx2
    {name: 'SYNCHRO-SITE13-l1', nodes: [GNOs[4], GNOs[7], GNOs[6]], capacity: '10Gbps'},
    {name: 'SYNCHRO-SITE13-l1-alter', nodes: [GNOs[4], GNOs[5], GNOs[6]], capacity: '10Gbps'},
    {name: 'SYNCHRO-SITE24-l1', nodes: [GNOs[5], GNOs[7]], capacity: '10Gbps'},
    {name: 'SYNCHRO-SITE13-l10', nodes: [GNOs[4], GNOs[15], GNOs[17], GNOs[6]], capacity: '10Gbps'},
    {name: 'SYNCHRO-SITE13-l10-alter', nodes: [GNOs[4], GNOs[15], GNOs[16], GNOs[17], GNOs[6]], capacity: '10Gbps'},
    {name: 'SYNCHRO-QFX12-l2', nodes: [GNOs[2], GNOs[0], GNOs[4], GNOs[15], GNOs[16], GNOs[17], GNOs[6], GNOs[1], GNOs[3]], capacity: '10Gbps'}
];
