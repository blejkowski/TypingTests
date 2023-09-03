import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

export interface Test {
    accuracy: number,
    wordsPerMinute: number
}
export interface User {
    Username: string,
    ProfileImage: string,
    BestWpm: number,
    AverageWpm: number,
    TypingTests: Number,
    Tests: Test[]
}

interface UserSliceState {
    user: User
}
const initialState: UserSliceState = {
    user: { Username: "",
            ProfileImage: "",
            BestWpm: 0,
            AverageWpm: 0,
            TypingTests: 0,
            Tests: []
        }
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        setUser: (state, action: PayloadAction<User>) =>{
            state.user = {
                Username: action.payload.Username,
                ProfileImage : action.payload.ProfileImage,
                BestWpm: action.payload.BestWpm,
                AverageWpm: action.payload.AverageWpm,
                TypingTests: action.payload.TypingTests,
                Tests: action.payload.Tests
            }
        }
    }
})

export const {setUser} = userSlice.actions;

const store = configureStore({
    reducer: {
        user: userSlice.reducer
    },
  })
  
  type RootState = ReturnType<typeof store.getState>;
  export const selectUser = (state: RootState) => state.user.user;
  
  export default store;