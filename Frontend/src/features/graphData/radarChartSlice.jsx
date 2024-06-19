import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const url = 'http://localhost:3000/graph/radar-chart'

const initialState = {
    isRadarLoading: true,
    radarChartGraphData: [],
}

export const fetchAverageLirByTopic = createAsyncThunk('graphData/fetchAverageLirByTopic', async (filter) => {
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
    name: 'radarChartGraphData',
    initialState: initialState,
    reducers: {
        isRadarLoading: (state) => {
            state.isRadarLoading = true
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAverageLirByTopic.pending, (state) => {
                state.isRadarLoading = true
            })
            .addCase(fetchAverageLirByTopic.fulfilled, (state, action) => {
                state.isRadarLoading = false
                const filteredData = action.payload.filter(item => item._id !== '')
                if (filteredData.length <= 17) {
                    state.radarChartGraphData = filteredData
                    return
                }

                const top17Data = filteredData.slice(0, 17)

                const otherData = filteredData.slice(17).reduce((acc, item) => {
                    acc.averageIntensity += item.averageIntensity
                    acc.averageLikelihood += item.averageLikelihood
                    acc.averageRelevance += item.averageRelevance
                    acc.total++
                    return acc
                }, { _id: 'Other', averageIntensity: 0, averageLikelihood: 0, averageRelevance: 0, total: 0 })

                if (otherData.total > 0) {
                    top17Data.push({ _id: 'Other', averageIntensity: Math.floor(otherData.averageIntensity / otherData.total), averageLikelihood: Math.floor(otherData.averageLikelihood / otherData.total), averageRelevance: Math.floor(otherData.averageRelevance / otherData.total)})
                }

                state.radarChartGraphData = top17Data
            })
            .addCase(fetchAverageLirByTopic.rejected, (state) => {
                state.isRadarLoading = false
            })
    }
})

export const { isRadarLoading } = graphDataSlice.actions

export default graphDataSlice.reducer