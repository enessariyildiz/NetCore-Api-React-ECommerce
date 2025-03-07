import { FieldValue } from "react-hook-form";
import { User } from "../../model/IUser";
import { createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../api/request";

interface AccountSlice {
    user: User | null;
}

const initialState: AccountSlice = {
    user: null
}

export const loginUser = createAsyncThunk<User, FieldValue>(
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