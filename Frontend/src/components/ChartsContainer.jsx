import { useDispatch, useSelector } from "react-redux"
import TopBarChartComponent from "./Charts/TopBarChartComponent"
import { useEffect } from "react"
import { fetchAverageLirByRegion } from "../features/graphData/topBarChartSlice"
import PieChartComponent from "./Charts/PieChartComponent"
import { fetchTopicDistribution } from "../features/graphData/topPieChartSlice"
import { fetchLikelihoodAndRelevanceByIntensity } from "../features/graphData/scatterPlotSlice"
import { fetchCountryDistribution } from "../features/graphData/bottomBarChartSlice"
import { fetchAverageIntensityByMonth } from "../features/graphData/areaChartSlice"
import { fetchAverageLirByTopic } from "../features/graphData/radarChartSlice"
import { fetchIntensityMedianByCountry } from "../features/graphData/radialBarChartSlice"
import { fetchAverageEndYearBySector } from "../features/graphData/funnelChartSlice"
import { fetchAverageLirBySector } from "../features/graphData/composedChartSlice"
import ScatterPlotComponent from "./Charts/ScatterPlotComponent"
import BottomBarChartComponent from "./Charts/BottomBarChartComponent"
import AreaChartComponent from "./Charts/AreaChartComponent"
import RadarChartComponent from "./Charts/RadarChartComponent"
import RadialBarChartComponent from "./Charts/RadialBarChartComponent"
import FunnelChartComponent from "./Charts/FunnelChartComponent"
import ComposedChartComponent from "./Charts/ComposedChartComponent"

const ChartsContainer = () => {
    const { isBarLoading, topBarChartGraphData } = useSelector((state) => state.topBarChart)
    const { isPieLoading, topPieChartGraphData } = useSelector((state) => state.topPieChart)
    const { isScatterLoading, scatterPlotGraphData } = useSelector((state) => state.scatterPlot)
    const { isBottomBarLoading, bottomBarChartGraphData } = useSelector((state) => state.bottomBarChart)
    const { isAreaLoading, areaChartGraphData } = useSelector((state) => state.areaChart)
    const { isRadarLoading, radarChartGraphData } = useSelector((state) => state.radarChart)
    const { isRadialBarLoading, radialBarChartGraphData } = useSelector((state) => state.radialBarChart)
    const { isFunnelLoading, funnelChartGraphData } = useSelector((state) => state.funnelChart)
    const { isComposedLoading, composedChartGraphData } = useSelector((state) => state.composedChart)
    const { isApplied, filter } = useSelector((state) => state.modal)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAverageLirByRegion(filter))
        dispatch(fetchTopicDistribution(filter))
        dispatch(fetchLikelihoodAndRelevanceByIntensity(filter))
        dispatch(fetchCountryDistribution(filter))
        dispatch(fetchAverageIntensityByMonth(filter))
        dispatch(fetchAverageLirByTopic(filter))
        dispatch(fetchIntensityMedianByCountry(filter))
        dispatch(fetchAverageEndYearBySector(filter))
        dispatch(fetchAverageLirBySector(filter))
    }, [isApplied])

    if(isBarLoading || isPieLoading || isScatterLoading || isBottomBarLoading || isAreaLoading || isRadarLoading || isRadialBarLoading || isFunnelLoading || isComposedLoading) {
        return (
            <div className="w-full h-[500px] flex items-center justify-center">
                <h2 className="text-6xl text-purple-800 font-bold">Loading...</h2>
            </div>
        )
    }

    return (
        <div className=" my-2 mx-20 flex flex-col max-sm:mx-4">
            <div className="flex w-full justify-between gap-10 my-10 max-lg:flex-col">
                <div className="w-[65%] h-[480px] flex shadow-md border-2 border-slate-300 rounded-xl shadow-slate-400 max-lg:w-full">
                    <TopBarChartComponent graphData={topBarChartGraphData} />
                </div>
                <div className="w-[35%] h-[480px] flex shadow-md border-2 border-slate-300 rounded-xl shadow-slate-400 max-sm:h-[580px] max-lg:w-full">
                    <PieChartComponent graphData={topPieChartGraphData} />
                </div>
            </div>
            <div className="flex mb-10 justify-between gap-10 max-lg:flex-col">
                <div className="flex flex-col w-[45%] gap-7 max-lg:w-full">
                    <div className="w-full h-[400px] flex shadow-md border-2 border-slate-300 rounded-xl shadow-slate-400">
                        <ScatterPlotComponent graphData={scatterPlotGraphData} />
                    </div>
                    <div className="w-full h-[400px] flex shadow-md border-2 border-slate-300 rounded-xl shadow-slate-400">
                        <BottomBarChartComponent graphData={bottomBarChartGraphData} />
                    </div>
                </div>
                <div className="w-[55%] h-[829px] flex shadow-md border-2 border-slate-300 rounded-xl shadow-slate-400 max-lg:w-full max-lg:h-[700px]">
                    <AreaChartComponent graphData={areaChartGraphData} />
                </div>
            </div>
            <div className="flex justify-between gap-10 max-lg:flex-col">
                <div className="w-[33%] max-lg:w-full h-[600px] max-sm:h-[500px] flex shadow-md border-2 border-slate-300 rounded-xl shadow-slate-400">
                    <RadarChartComponent graphData={radarChartGraphData} />
                </div>
                <div className="w-[33%] max-lg:w-full h-[600px] max-sm:h-[500px] flex shadow-md border-2 border-slate-300 rounded-xl shadow-slate-400">
                    <RadialBarChartComponent graphData={radialBarChartGraphData} />
                </div>
                <div className="w-[33%] max-lg:w-full h-[600px] max-sm:h-[500px] flex shadow-md border-2 border-slate-300 rounded-xl shadow-slate-400">
                    <FunnelChartComponent graphData={funnelChartGraphData} />
                </div>
            </div>
            <div className="flex w-full justify-between gap-10 my-10">
                <div className="w-full h-[400px] flex shadow-md border-2 border-slate-300 rounded-xl shadow-slate-400">
                    <ComposedChartComponent graphData={composedChartGraphData} />
                </div>
            </div>
        </div>
    )
}

export default ChartsContainer