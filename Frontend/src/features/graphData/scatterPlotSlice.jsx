import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const backendURL = import.meta.env.VITE_BACKEND_URL

const url = `${backendURL}graph/scatter-plot`

const initialState = {
    isScatterLoading: true,
    scatterPlotGraphData: [],
}

export const fetchLikelihoodAndRelevanceByIntensity = createAsyncThunk('graphData/fetchLikelihoodAndRelevanceByIntensity', async (filter) => {
    try {
        const query = new URLSearchParams({ filter: JSON.stringify(filter) }).toString()
        const response = await fetch(`${url}?${query}`)
        if (!response.ok) {
            throw new Error('Server Error')
        }
        const data = await response.json()
        return data.data
    }
    catch (err) {
        console.log(err)
    }
})

const graphDataSlice = createSlice({
    name: 'scatterPlotGraphData',
    initialState: initialState,
    reducers: {
        isScatterLoading: (state) => {
            state.isLoading = true
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLikelihoodAndRelevanceByIntensity.pending, (state) => {
                state.isScatterLoading = true
            })
            .addCase(fetchLikelihoodAndRelevanceByIntensity.fulfilled, (state, action) => {
                state.isScatterLoading = false
                const filteredData = action.payload.filter(item => item.intensity !== '')
                state.scatterPlotGraphData = filteredData
            })
            .addCase(fetchLikelihoodAndRelevanceByIntensity.rejected, (state) => {
                state.isScatterLoading = false
            })
    }
})

export const { isScatterLoading } = graphDataSlice.actions

export default graphDataSlice.reducer