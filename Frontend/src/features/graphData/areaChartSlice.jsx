import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const url = 'http://localhost:3000/graph/line-chart'

const initialState = {
    isAreaLoading: true,
    areaChartGraphData: [],
}

export const fetchAverageIntensityByMonth = createAsyncThunk('graphData/fetchAverageIntensityByMonth', async (filter) => {
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
    name: 'areaChartGraphData',
    initialState: initialState,
    reducers: {
        isAreaLoading: (state) => {
            state.isAreaLoading = true
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAverageIntensityByMonth.pending, (state) => {
                state.isAreaLoading = true
            })
            .addCase(fetchAverageIntensityByMonth.fulfilled, (state, action) => {
                state.isAreaLoading = false
                state.areaChartGraphData = action.payload
            })
            .addCase(fetchAverageIntensityByMonth.rejected, (state) => {
                state.isAreaLoading = false
            })
    }
})

export const { isAreaLoading } = graphDataSlice.actions

export default graphDataSlice.reducer