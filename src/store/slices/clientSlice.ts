import { createSlice } from '@reduxjs/toolkit';

interface ClientSlice {
    S_CLIENTS: unknown
}

const initialState: ClientSlice = {
    S_CLIENTS: null
}

const ClientSlice = createSlice({
    name: 'devices',
    initialState,
    reducers: {
        A_CLIENTS(state, {payload}){
            state.S_CLIENTS = payload
        }
    }
})
export const {
    A_CLIENTS
  } = ClientSlice.actions;
export default ClientSlice.reducer;