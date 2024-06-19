const express = require('express');
const { getHome, getAverageLirByRegion, getTopicDistribution, getAverageLirByTopic, getIntensityMedianByCountry, getAverageIntensityByMonth, getCountryDistribution, getAverageLirBySector, getAverageEndYearBySector, getLikelihoodAndRelevanceByIntensity } = require('../controllers/graph');
const router = express.Router();

//Routes ordered in the same order as the graphs in the frontend
router.get('/', getHome);

router.get('/top-bar-chart', getAverageLirByRegion);

router.get("/top-pie-chart", getTopicDistribution);

router.get('/scatter-plot', getLikelihoodAndRelevanceByIntensity);

router.get('/bottom-bar-chart', getCountryDistribution);

router.get('/line-chart', getAverageIntensityByMonth);

router.get('/radar-chart', getAverageLirByTopic);

router.get('/radial-bar-chart', getIntensityMedianByCountry);

router.get('/funnel-chart', getAverageEndYearBySector);

router.get('/composed-chart', getAverageLirBySector);

module.exports = router;