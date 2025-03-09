import { FieldValues } from "react-hook-form";
import { User } from "../../model/IUser";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import request from "../../api/request";
import { router } from "../../Router/Routes";

interface AccountSlice {
    user: User | null;
}

const initialState: AccountSlice = {
    user: null
}

export const loginUser = createAsyncThunk<User, FieldValues>(
    "accountt/login",
    async (data, { rejectWithValue }) => {
        try {
            const user = await request.Account.login(data);
            localStorage.setItem("user", JSON.stringify(user));
            return user;
        } catch (error: any) {
            return rejectWithValue({ error: error.data })
        }
    }
)

export const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            localStorage.removeItem("user");
            router.navigate("/catalog")
        }
    },
    extraReducers: (builder => {
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload;
        })
    })
})

export const { logout } = accountSlice.actions;