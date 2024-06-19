import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const backendURL = import.meta.env.VITE_BACKEND_URL

const url = `${backendURL}graph/bottom-bar-chart`

const initialState = {
    isBottomBarLoading: true,
    bottomBarChartGraphData: [],
}

export const fetchCountryDistribution = createAsyncThunk('graphData/fetchCountryDistribution', async (filter) => {
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
    name: 'bottomBarChartGraphData',
    initialState: initialState,
    reducers: {
        isBottomBarLoading: (state) => {
            state.isLoading = true
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCountryDistribution.pending, (state) => {
                state.isBottomBarLoading = true
            })
            .addCase(fetchCountryDistribution.fulfilled, (state, action) => {
                state.isBottomBarLoading = false
                const filteredData = action.payload.filter(item => item._id !== '');
                if (filteredData.length <= 15) {
                    state.bottomBarChartGraphData = filteredData;
                    return;
                }

                const top15Data = filteredData.slice(0, 15);

                const otherData = filteredData.slice(15).reduce((acc, item) => {
                    if (item._id !== '') {
                        acc.count += item.count;
                        acc.total++;
                    }
                    return acc;
                }, { _id: 'Other', count: 0, total: 0 });

                if (otherData.count > 0) {
                    top15Data.push({ _id: 'Other', count: Math.floor(otherData.count / otherData.total) });
                }

                state.bottomBarChartGraphData = top15Data;
            })
            .addCase(fetchCountryDistribution.rejected, (state) => {
                state.isBottomBarLoading = false
            })
    }
})

export const { isBottomBarLoading } = graphDataSlice.actions

export default graphDataSlice.reducer