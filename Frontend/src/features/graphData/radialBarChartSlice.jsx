import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const url = 'http://localhost:3000/graph/radial-bar-chart'

const initialState = {
    isRadialBarLoading: true,
    radialBarChartGraphData: [],
}

export const fetchIntensityMedianByCountry = createAsyncThunk('graphData/fetchIntensityMedianByCountry', async (filter) => {
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
    name: 'radialBarGraphData',
    initialState: initialState,
    reducers: {
        isRadialBarLoading: (state) => {
            state.isRadialBarLoading = true
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchIntensityMedianByCountry.pending, (state) => {
                state.isRadialBarLoading = true
            })
            .addCase(fetchIntensityMedianByCountry.fulfilled, (state, action) => {
                state.isRadialBarLoading = false
                const filteredData = action.payload.filter(item => item._id !== '')
                if (filteredData.length <= 10) {
                    state.radialBarChartGraphData = filteredData
                    return
                }

                const top10Data = filteredData.slice(0, 10)

                const otherData = filteredData.slice(10).reduce((acc, item) => {
                    acc.relevance_intensity += item.relevance_intensity
                    acc.total++
                    return acc
                }, { _id: 'Other', relevance_intensity: 0, total: 0 })

                if (otherData.total > 0) {
                    top10Data.push({ _id: 'Other', relevance_intensity: Math.floor(otherData.relevance_intensity / otherData.total)});
                }

                state.radialBarChartGraphData = top10Data
            })
            .addCase(fetchIntensityMedianByCountry.rejected, (state) => {
                state.isRadialBarLoading = false
            })
    }
})

export const { isRadialBarLoading } = graphDataSlice.actions

export default graphDataSlice.reducer