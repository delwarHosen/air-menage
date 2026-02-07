import baseApi from "../baseApi";

const authApis = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        signUp: builder.mutation({
            query: (formData) => ({
                url: '/register',
                method: 'POST',
                body: formData,
                
            }),
            invalidatesTags: ['user'],
        }),
        signIn: builder.mutation({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: ['profile'],
        }),
    }),
    overrideExisting: true,
});

export const { useSignUpMutation, useSignInMutation } = authApis;
export default authApis;