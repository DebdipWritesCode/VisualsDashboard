import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isModalOpen: false,
    filter: {
        end_year: [],
        topics: [],
        regions: [],
        sectors: [],
        pests: [],
        sources: [],
        countries: [],
    },
    countFilters: 0,
    isApplied: false
}

export const filterModalSlice = createSlice({
    name: 'filterModal',
    initialState: initialState,
    reducers: {
        openModal: (state) => {
            state.isModalOpen = true
        },
        closeModal: (state) => {
            state.isModalOpen = false
        },
        addFilter: (state, action) => {
            const { filterType, filterValue } = action.payload
            if (state.filter[filterType]) {
                if (!state.filter[filterType].includes(filterValue)) {
                    state.filter[filterType].push(filterValue)
                    state.countFilters += 1
                }
            }
        },
        removeFilter: (state, action) => {
            const { filterType, filterValue } = action.payload
            if (state.filter[filterType]) {
                const index = state.filter[filterType].indexOf(filterValue)
                if (index !== -1) {
                    state.filter[filterType].splice(index, 1)
                    state.countFilters -= 1
                }
            }
        },
        applyFilters: (state) => {
            state.isApplied = !state.isApplied
        }
    }
});

export const { openModal, closeModal, addFilter, removeFilter, applyFilters } = filterModalSlice.actions

export default filterModalSlice.reducer