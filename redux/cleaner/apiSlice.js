// store/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { cleanerDetailsData } from './CleanerRequestData';

export const taskApi = createApi({
    reducerPath: 'taskApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/' }),
    endpoints: (builder) => ({
        getTasks: builder.query({
            queryFn: () => ({ data: cleanerDetailsData }),
        }),
    }),
});

export const { useGetTasksQuery } = taskApi;