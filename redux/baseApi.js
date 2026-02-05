import { createApi } from "@reduxjs/toolkit/query/react";
// import * as SecureStore from "expo-secure-store"

import AsyncStorage from "@react-native-async-storage/async-storage";
const DB_KEY = "offline_properties";
const DB_BOOKING_KEY = "offline_bookings";

// Future e jokhon API asbe, tokhon ei function ta delete kore sudhu fetchBaseQuery use korben
const customBaseQuery = async (args, api, extraOptions) => {
    const { url, method, body } = args;

    try {
        // Ekhon jonno logic (Local Storage)
        const existingData = await AsyncStorage.getItem(DB_KEY);
        let db = existingData ? JSON.parse(existingData) : [];

        if (url === "/properties" && method === "POST") {
            const newProperty = {
                id: Date.now().toString(),
                ...body,
                createdAt: new Date().toISOString()
            };
            db.push(newProperty);
            await AsyncStorage.setItem(DB_KEY, JSON.stringify(db));
            return { data: newProperty };
        }

        if (url === "/properties" && method === "GET") {
            return { data: db };
        }

        // --- NEW: Cleaning Requests Logic ---
        if (url === "/cleaning-requests" && method === "POST") {
            const existingCleaningRequest = await AsyncStorage.getItem(DB_BOOKING_KEY);
            let cleaningRequest = existingCleaningRequest ? JSON.parse(existingCleaningRequest) : [];

            const newRequest = {
                id: "REQUEST-" + Date.now(),
                ...body,
                createdAt: new Date().toISOString()
            };

            cleaningRequest.push(newRequest);
            await AsyncStorage.setItem(DB_BOOKING_KEY, JSON.stringify(cleaningRequest));
            console.log("Successfully Saved to AsyncStorage:", newRequest);
            return { data: newRequest }
        }

        return { error: { status: 404, data: "Not Found" } };

    } catch (error) {
        return { error: { status: 500, data: error.message } };
    }
};

const baseApis = createApi({
    reducerPath: "api",
    // Ekhon customBaseQuery cholbe, pore fetchBaseQuery({ baseUrl: '...' }) bosaben
    baseQuery: customBaseQuery,
    tagTypes: ["property"],
    endpoints: () => ({}),
});

export default baseApis;