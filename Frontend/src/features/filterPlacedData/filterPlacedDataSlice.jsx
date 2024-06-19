import { createSlice } from '@reduxjs/toolkit'
import { countries, end_years, pests, regions, sectors, sources, topics } from '../../data/filterData'

const initialState = {
    isAddModalOpen : false,
    end_year: end_years,
    sectors: sectors,
    topics: topics,
    regions: regions,
    pests: pests,
    sources: sources,
    countries: countries,
    currentFilter : ''
}

export const filterPlacedDataSlice = createSlice({
    name: 'filterPlacedData',
    initialState: initialState,
    reducers: {
        openAddModal: (state, action) => {
            state.currentFilter = action.payload
            state.isAddModalOpen = true
        },
        closeAddModal: (state) => {
            state.isAddModalOpen = false
        },
        addItem: (state, action) => {
            state[state.currentFilter].push(action.payload)
            state.isAddModalOpen = false
        }
    }
});

export const { openAddModal, closeAddModal, addItem } = filterPlacedDataSlice.actions

export default filterPlacedDataSlice.reducer