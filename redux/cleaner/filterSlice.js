import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    equipmentProvided: { vacuumCleaner: false, cleaningProducts: false },
    workRadius: 30,
    linenServices: {
        bedLinen: false,
        towel: false,
        laundry: false
    },
    propertyDetailsL: {
        bedrooms: 1,
        beds: 1,
        bathroom: 1
    },
    priceRange: [0, 200]
}

const filterSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setFilters: (state, action) => {
            return ({ ...state, ...action.payload })
        }
    },
    resetFilter: () => initialState
});

export const { setFilters, resetFilter } = filterSlice.actions;
export default filterSlice.reducer;

