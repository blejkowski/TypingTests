import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface User {
    Username: string,
    Password: string,
    BestWpn: number,
    AverageWpm: number,
    TypingTests: Number,
}

interface InitialState {
    Username: string,
    Password: string,
    BestWpn: number,
    AverageWpm: number,
    TypingTests: Number,
}

const initialState: InitialState = {
    
    Username: "",
    Password: "",
    BestWpn: 0,
    AverageWpm: 0,
    TypingTests: 0,
}

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUserData: (state: User, action: PayloadAction<User> ) =>{
            state = action.payload;
        }
    }
});
export const {setUserData} = userSlice.actions
export default userSlice.reducer
