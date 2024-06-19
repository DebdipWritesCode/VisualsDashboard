import { configureStore } from '@reduxjs/toolkit'
import filterModalReducer from '../features/filterModal/filterModalSlice'
import filterPlacedDataReducer from '../features/filterPlacedData/filterPlacedDataSlice'
import topBarChartReducer from '../features/graphData/topBarChartSlice'
import topPieChartReducer from '../features/graphData/topPieChartSlice'
import scatterPlotReducer from '../features/graphData/scatterPlotSlice'
import bottomBarChartReducer from '../features/graphData/bottomBarChartSlice'
import areaChartReducer from '../features/graphData/areaChartSlice'
import radarChartReducer from '../features/graphData/radarChartSlice'
import radialBarChartReducer from '../features/graphData/radialBarChartSlice'
import funnelChartReducer from '../features/graphData/funnelChartSlice'
import composedChartReducer from '../features/graphData/composedChartSlice'

export const store = configureStore({
    reducer: {
        modal: filterModalReducer,
        filterData: filterPlacedDataReducer,
        topBarChart: topBarChartReducer,
        topPieChart: topPieChartReducer,
        scatterPlot: scatterPlotReducer,
        bottomBarChart: bottomBarChartReducer,
        areaChart: areaChartReducer,
        radarChart: radarChartReducer,
        radialBarChart: radialBarChartReducer,
        funnelChart: funnelChartReducer,
        composedChart: composedChartReducer,
    }
})