import baseApis from "../baseApi";

const authApis = baseApis.injectEndpoints({
    endpoints: (builder) => ({
        signUp: builder.mutation({
            query: (data) => ({
                url: '/auth/register',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['auth'],
        }),
        signIn: builder.mutation({
            query: (data) => ({
                url: '/auth/login',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['profile'],
        }),
    })
})

export const {
    useSignUpMutation,
    useSignInMutation
} = authApis;