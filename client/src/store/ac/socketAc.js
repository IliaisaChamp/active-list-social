import {SET_SOCKET} from "../types/socketTypes";

export const setSocket = (socket) => {
    return {
        type: SET_SOCKET,
        payload: socket,
    }
}
