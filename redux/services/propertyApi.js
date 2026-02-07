import baseApis from "../baseApi";

const propertyApi = baseApis.injectEndpoints({
    endpoints: (builder) => ({
        createProperty: builder.mutation({
            query: (newProperty) => ({
                url: "/properties",
                method: "POST",
                body: newProperty
            }),
            invalidatesTags: ["property"]
        }),
        getProperties: builder.query({
            query: () => ({
                url: "/properties",
                method: "GET",
            }),
            providesTags: ["property"],
        }),
        createCleaningRequest: builder.mutation({
            query: (newCleaningRequest) => ({
                url: "/cleaning-requests",
                method: "POST",
                body: newCleaningRequest
            }),
            providesTags: ["property"]
        }),
        getCleaningRequests: builder.query({
            query: () => ({
                url: "/cleaning-requests",
                method: "GET"
            }),
            providesTags: ["property"]
        })
    })
});


export const {
    useCreatePropertyMutation,
    useGetPropertiesQuery,
    useCreateCleaningRequestMutation,
    useGetCleaningRequestsQuery,
} = propertyApi;