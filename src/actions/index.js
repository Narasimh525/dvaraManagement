import * as actioTypes from './types';


export const setUser = user => {
    return {
        type: actioTypes.SET_USER,
        payload: {
            currentUser: user
        }
    }
};

export const clearUser = () => {
    return {
        type: actioTypes.CLEAR_USER
    }
}

export const setTableData = ( data ) => {
    return {
        type: actioTypes.EXPORT_TABLE_DATA,
        payload : {
            tableData: data
        }
    }
}


export const setLoader = (data) => {
    return {
        type: actioTypes.SET_LOADER,
        payload: {
            isLoading: data
        }
    }
};

export const RemoveLoader = () => {
    return {
        type: actioTypes.REMOVE_LOADER,
        payload: {
            isLoading: false
        }
    }
};