import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utilities/axios";

export const getCategories = createAsyncThunk(
    "category/getCategories",
    async(ThinkApi,{rejectWithValue}) => {
        try {
            return await axios.get(`/api/v1/category`);
        } catch (error) {
            return rejectWithValue(`Errores: ${error.message}`);
        }
    }
)