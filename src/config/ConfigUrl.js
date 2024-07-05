// FORM-SERVICE
export const FORM_SERVICE_BASE = process.env.REACT_APP_API_FORM_SERVICE_BASE;
    // FORM CONTROLLER
    export const FORM_SERVICE_LOAD_FIELD = `${FORM_SERVICE_BASE}/form-service/form-field`;
    export const FORM_SERVICE_LOAD_DATA = `${FORM_SERVICE_BASE}/form-service/get-data`;
    export const FORM_SERVICE_INSERT_DATA = `${FORM_SERVICE_BASE}/form-service/insert-data`;
    export const FORM_SERVICE_UPDATE_DATA = `${FORM_SERVICE_BASE}/form-service/update-data`;
    export const FORM_SERVICE_DELETE_DATA = `${FORM_SERVICE_BASE}/form-service/delete-data`;
    export const FORM_SERVICE_VIEW_DATA = `${FORM_SERVICE_BASE}/form-service/get-detail-data`;
    export const FORM_SERVICE_UPDATE_STATUS = `${FORM_SERVICE_BASE}/form-service/update-status`;
    // REPORT CONTROLLER
    export const FORM_SERVICE_REPORT_DATA_EXCEL = `${FORM_SERVICE_BASE}/form-service/generate/excel`;


export const TREASURY_SERVICE_BASE = process.env.REACT_APP_API_TREASURY_SERVICE_BASE;

    //TREASURY CONTROLLER

    export const TREASURY_SERVICE_GET_SEQUENCE = `${TREASURY_SERVICE_BASE}/treasury-service/nextSequnce`;

export const MM_SERVICE_BASE = process.env.REACT_APP_API_MM_SERVICE_BASE;

    export const MM_SERVICE_GET_INTAMOUNT = `${MM_SERVICE_BASE}/treasury-service/money-market/generate-int-amount`
    export const MM_SERVICE_DOWNLOAD_MSG = `${MM_SERVICE_BASE}/treasury-service/download`
    export const MM_SERVICE_LIST_POSTING = `${MM_SERVICE_BASE}/treasury-service/list-journal`
    export const MM_SERVICE_LIST_MESSAGE = `${MM_SERVICE_BASE}/treasury-service/list-file`
    export const MM_SERVICE_LIST_FILE_TRADE = `${MM_SERVICE_BASE}/treasury-service/list-file-trade`
    export const MM_SERVICE_LIST_JOURNAL = `${MM_SERVICE_BASE}/treasury-service/journal`
    export const MM_SERVICE_EXECUTE_EOD = `${MM_SERVICE_BASE}/treasury-service/end-of-day/process`
    