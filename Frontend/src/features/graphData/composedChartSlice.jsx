import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const backendURL = import.meta.env.VITE_BACKEND_URL

const url = `${backendURL}graph/composed-chart`

const initialState = {
    isComposedLoading: true,
    composedChartGraphData: [],
}

export const fetchAverageLirBySector = createAsyncThunk('graphData/fetchAverageLirBySector', async (filter) => {
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
    name: 'composedChartGraphData',
    initialState: initialState,
    reducers: {
        isComposedLoading: (state) => {
            state.isComposedLoading = true
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAverageLirBySector.pending, (state) => {
                state.isComposedLoading = true
            })
            .addCase(fetchAverageLirBySector.fulfilled, (state, action) => {
                state.isComposedLoading = false
                state.composedChartGraphData = action.payload
            })
            .addCase(fetchAverageLirBySector.rejected, (state) => {
                state.isComposedLoading = false
            })
    }
})

export const { isComposedLoading } = graphDataSlice.actions

export default graphDataSlice.reducer