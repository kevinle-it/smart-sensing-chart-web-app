export const FETCHING_DATA = 'FETCHING_DATA';
export const FETCHING_DATA_SUCCESS = 'FETCHING_DATA_SUCCESS';
export const FETCHING_DATA_FAILURE = 'FETCHING_DATA_FAILURE';

export const LOCAL_IP_TEMP_TREND = {
    IP_TEMP_TREND_ARRAY: 'IP_TEMP_TREND_ARRAY',
    OS_TEMP_TREND_ARRAY: 'OS_TEMP_TREND_ARRAY',
    IP_TEMP_STOCK_CAPACITY: 10000,  // Maximum rows can be saved in the local storage
    IP_TEMP_ITEM_TO_GET: 1000,  // Number of items that will be gotten to show on grid
    IP_TEMP_TIME_SPACE_GET_FROM_STOCK: 2000,    // Time space to get an amount of data from stock
    // to show on grid,
    // 1000 is equivalent to 1 second
    IP_TEMP_TIME_SPACE_PUSH_TO_STOCK: 3000,
};

export const ROLES = {
    ROLE_ADMIN: 'admin',
    ROLE_IP: 'ip',
    ROLE_OS: 'os',
    ROLE_AS: 'as',
};

export const ROUTE = {
    Login: '/login',
    Logout: '/logout',
    Pages: '/pages',
    Dashboard: '/',
    get Analysis() {
        return `${ROUTE.Pages}/analysis`;
    },
    get Report() {
        return `${ROUTE.Pages}/report`;
    },
};

// Factory Shift time rule: 3 shifts per day
// Shift 1 => Starts at 6:00:00 AM today
// Shift 3 => Ends at 5:59:59 AM tomorrow
export const START_WORK_DAY_TIME = {hours: 6, minutes: 0, seconds: 0};
export const END_WORK_DAY_TIME = {hours: 5, minutes: 59, seconds: 59};

// Model
export const MODEL_NAMES = new Map([    // initial data
    ['N/A', {   // name to show on screen
        key: 'N/A', // key to send request to server
        selected: true,
    }]
]);

// Shift
export const SHIFT_OPTIONS = ['All Shifts', 'Shift 1', 'Shift 2', 'Shift 3'];

// Defect Name
export const IP_DEFECT_NAME = [
    'SHORT LENGTH',
    'LONG LENGTH',
    'SMALL WIDTH',
    'BIG WIDTH',
    'POOR TRIMMING',
    'NO TRIMMING',
    'CROOKED TOE',
    'AIR BUBBLE',
    'LACK OF COMPOUND'
];
export const OS_DEFECT_NAME = [
    'DIRTY (DUST, CONTAMINANTS ETC.)',
    'SOIL (OILY, MARKS ETC.)',
    'COLOR MIGRATION',
    'AIR BUBBLED',
    'STICKY (OVER CURE)',
    'PRESSING DATE IS VISIBLE',
    'TRIMMING EDGE IS 0.2MM OR LESS',
    'MATCHING WITH SIGNED OUTSOLE MCS',
    'FINISHED O/S ARE PACKED IN CLEAN POLYBAGS/CATONS'
];

// Data Export Type
export const ExportType = {
    EXCEL: 'Excel',
    PDF: 'PDF',
    PNG: 'PNG',
};

// ID for HTML elements to generate canvas of the elements thru html2canvas library
// ---------- Dashboard ----------
export const DASHBOARD_CONTAINER_ID = 'DASHBOARD_CONTAINER_ID';
export const DASHBOARD_STATION_STATUS_SHIFT_STATUS_ID = 'DASHBOARD_STATION_STATUS_SHIFT_STATUS_ID';
export const DASHBOARD_TEMPERATURE_TREND_ITEM_STATION_1_2_ID = 'DASHBOARD_TEMPERATURE_TREND_ITEM_STATION_1_2_ID';
export const DASHBOARD_TEMPERATURE_TREND_ITEM_STATION_3_4_ID = 'DASHBOARD_TEMPERATURE_TREND_ITEM_STATION_3_4_ID';
export const DASHBOARD_TEMPERATURE_TREND_ITEM_STATION_5_6_ID = 'DASHBOARD_TEMPERATURE_TREND_ITEM_STATION_5_6_ID';
export const DASHBOARD_TEMPERATURE_TREND_ITEM_STATION_7_8_ID = 'DASHBOARD_TEMPERATURE_TREND_ITEM_STATION_7_8_ID';
export const DASHBOARD_PROCESSING_STATUS_ID = 'DASHBOARD_PROCESSING_STATUS_ID';
export const DASHBOARD_DOWN_TIME_BY_SHIFT_ID = 'DASHBOARD_DOWN_TIME_BY_SHIFT_ID';
export const DASHBOARD_OEE_CHART_OEE_GENERAL_LOSS_OF_WORK_CYCLE_DEFECT_STATION_COMPARISON_ID = 'DASHBOARD_OEE_CHART_OEE_GENERAL_LOSS_OF_WORK_CYCLE_DEFECT_STATION_COMPARISON_ID';
export const DASHBOARD_SWING_ARM_MACHINE_SWING_OS_STATION_COMPARISON_ID = 'DASHBOARD_SWING_ARM_MACHINE_SWING_OS_STATION_COMPARISON_ID';
// ---------- Analysis ----------
export const ANALYSIS_CONTAINER_ID = 'ANALYSIS_CONTAINER_ID';
export const ANALYSIS_SHIFT_STATUS_ID = 'ANALYSIS_SHIFT_STATUS_ID';
export const ANALYSIS_TEMPERATURE_TREND_ITEM_STATION_1_2_ID = 'ANALYSIS_TEMPERATURE_TREND_ITEM_STATION_1_2_ID';
export const ANALYSIS_TEMPERATURE_TREND_ITEM_STATION_3_4_ID = 'ANALYSIS_TEMPERATURE_TREND_ITEM_STATION_3_4_ID';
export const ANALYSIS_TEMPERATURE_TREND_ITEM_STATION_5_6_ID = 'ANALYSIS_TEMPERATURE_TREND_ITEM_STATION_5_6_ID';
export const ANALYSIS_TEMPERATURE_TREND_ITEM_STATION_7_8_ID = 'ANALYSIS_TEMPERATURE_TREND_ITEM_STATION_7_8_ID';
export const ANALYSIS_PROCESSING_STATUS_ID = 'ANALYSIS_PROCESSING_STATUS_ID';
export const ANALYSIS_OEE_CHART_OEE_GENERAL_LOSS_OF_WORK_CYCLE_DEFECT_STATION_COMPARISON_ID = 'ANALYSIS_OEE_CHART_OEE_GENERAL_LOSS_OF_WORK_CYCLE_DEFECT_STATION_COMPARISON_ID';
export const ANALYSIS_SWING_ARM_MACHINE_SWING_OS_STATION_COMPARISON_ID = 'ANALYSIS_SWING_ARM_MACHINE_SWING_OS_STATION_COMPARISON_ID';
