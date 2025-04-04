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

export const getUser = createAsyncThunk<User>(
    "account/getUser",
    async (_, thunkAPI) => {
        thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem("user")!)));
        try {
            const user = await request.Account.getUser();
            localStorage.setItem("user", JSON.stringify(user));
            return user;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    },
    {
        condition: () => {
            if (!localStorage.getItem("user")) return false;
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
        },
        setUser: (state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers: (builder => {
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload;
        })

        builder.addCase(getUser.fulfilled, (state, action) => {
            state.user = action.payload;
        })

        builder.addCase(getUser.rejected, (state) => {
            state.user = null;
            localStorage.removeItem("user");
            router.navigate("/login");
        })
    })
})

export const { logout, setUser } = accountSlice.actions;