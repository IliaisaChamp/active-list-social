import {SET_ONLINE} from "../types/onlineTypes";

export const setOnline = (online) => {
    return {
        type: SET_ONLINE,
        payload: online,
    }
}