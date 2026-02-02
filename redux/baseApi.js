import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import * as SecureStore from "expo-secure-store"

const baseQuery = fetchBaseQuery({
  // baseUrl: 'https://api.divandioneapp.com',
  baseUrl: "https://pop-chat-server-nine.vercel.app",
  prepareHeaders: async headers => {
    const token = await SecureStore.getItemAsync("accessToken")

    if (token) {
      headers.set("Authorization", `Bearer ${token}`)
    }

    return headers
  }
})

const baseApis = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: [
    "auth",
    "profile",
    "banner",
    "product",
    "category",
    "subcategory",
    "cart",
    "shippingAddress",
    "pickupAddress",
    "order",
    "privacyPolicy",
    "termsAndConditions"
  ],
  endpoints: () => ({})
})

export default baseApis
