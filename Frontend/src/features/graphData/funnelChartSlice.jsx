import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const url = 'http://localhost:3000/graph/funnel-chart'

const initialState = {
    isFunnelLoading: true,
    funnelChartGraphData: [],
}

export const fetchAverageEndYearBySector = createAsyncThunk('graphData/fetchAverageEndYearBySector', async (filter) => {
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
    name: 'funnelChartGraphData',
    initialState: initialState,
    reducers: {
        isFunnelLoading: (state) => {
            state.isFunnelLoading = true
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAverageEndYearBySector.pending, (state) => {
                state.isFunnelLoading = true
            })
            .addCase(fetchAverageEndYearBySector.fulfilled, (state, action) => {
                state.isFunnelLoading = false
                state.funnelChartGraphData = action.payload.filter((item) => (item._id !== ''))
            })
            .addCase(fetchAverageEndYearBySector.rejected, (state) => {
                state.isFunnelLoading = false
            })
    }
})

export const { isFunnelLoading } = graphDataSlice.actions

export default graphDataSlice.reducer