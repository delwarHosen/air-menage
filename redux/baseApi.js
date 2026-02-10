import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import * as SecureStore from 'expo-secure-store';

const BASE_URL = "https://air-menage-server-1.onrender.com/api";

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: async (headers, { getState, endpoint }) => {
        
        const token = await SecureStore.getItemAsync("accessToken");
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }

        return headers;
    },
});

const baseApi = createApi({
    reducerPath: 'api',
    baseQuery,
    tagTypes: ["user", "profile","property"],
    endpoints: () => ({}),
});

export default baseApi;