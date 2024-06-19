import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const backendURL = import.meta.env.VITE_BACKEND_URL

const url = `${backendURL}graph/top-pie-chart`

const initialState = {
    isPieLoading: true,
    topPieChartGraphData: [],
}

export const fetchTopicDistribution = createAsyncThunk('graphData/fetchTopicDistribution', async (filter) => {
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
    name: 'topPieChartGraphData',
    initialState: initialState,
    reducers: {
        isLoading: (state) => {
            state.isPieLoading = true
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTopicDistribution.pending, (state) => {
                state.isPieLoading = true
            })
            .addCase(fetchTopicDistribution.fulfilled, (state, action) => {
                state.isPieLoading = false

                const filteredData = action.payload.filter(item => item._id !== '')

                if(filteredData.length <= 15) {
                    state.topPieChartGraphData = filteredData
                    return
                }

                const top20Data = filteredData.slice(0, 15)

                const otherData = filteredData.slice(15).reduce((acc, item) => {
                    acc.other.count += item.count
                    return acc
                }, { other: { _id: 'other', count: 0} });

                if(otherData.other.count > 0) {
                    top20Data.push(otherData.other)
                }

                state.topPieChartGraphData = top20Data
            })
            .addCase(fetchTopicDistribution.rejected, (state) => {
                state.isPieLoading = false
            })
    }
})

export const { isLoading } = graphDataSlice.actions

export default graphDataSlice.reducer