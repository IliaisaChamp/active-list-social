import {SET_ONLINE} from "../types/onlineUsersTypes";
import io from "socket.io-client";
import {setSocket} from "./socketAc";

export const setOnline = (online) => {
    return {
        type: SET_ONLINE,
        payload: online,
    }
}

export const createSocketConnect = (socket, user) => (dispatch) => {
    // socket.current = io("http://localhost:3001", {
    //     query: { id: user.id },
    // });
    console.log('SOCKET CREATED')
    dispatch(setSocket(socket))
}