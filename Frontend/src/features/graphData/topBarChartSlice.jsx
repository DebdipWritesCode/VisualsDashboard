import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const backendURL = import.meta.env.VITE_BACKEND_URL

const url = `${backendURL}graph/top-bar-chart`

const initialState = {
    isBarLoading: true,
    topBarChartGraphData: [],
}

export const fetchAverageLirByRegion = createAsyncThunk('graphData/fetchAverageLirByRegion', async (filter) => {
    try {
        const query = new URLSearchParams({ filter: JSON.stringify(filter) }).toString()
        const response = await fetch(`${url}?${query}`)
        if(!response.ok) {
            throw new Error('Server Error')
        }
        const data = await response.json()
        return data.data
    }
    catch(err) {
        console.log(err)
    }
})

const graphDataSlice = createSlice({
    name: 'topBarChartGraphData',
    initialState: initialState,
    reducers: {
        isLoading: (state) => {
            state.isLoading = true
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAverageLirByRegion.pending, (state) => {
                state.isBarLoading = true
            })
            .addCase(fetchAverageLirByRegion.fulfilled, (state, action) => {
                state.isBarLoading = false
                state.topBarChartGraphData = action.payload
            })
            .addCase(fetchAverageLirByRegion.rejected, (state) => {
                state.isBarLoading = false
            })
    }
})

export const { isLoading } = graphDataSlice.actions

export default graphDataSlice.reducer