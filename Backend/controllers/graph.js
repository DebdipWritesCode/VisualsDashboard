const GraphData = require("../models/graphData");

function queryMaker(filters) {
  if (!filters) return {};
  filters = JSON.parse(filters);
  const query = {};

  if (filters.end_year && filters.end_year.length > 0) {
    const years = filters.end_year.map((year) => parseInt(year));
    query.end_year = { $in: years };
  }

  if (filters.topics && filters.topics.length > 0) {
    query.topic = { $in: filters.topics };
  }

  if (filters.regions && filters.regions.length > 0) {
    query.region = { $in: filters.regions };
  }

  if (filters.sectors && filters.sectors.length > 0) {
    query.sector = { $in: filters.sectors };
  }

  if (filters.pests && filters.pests.length > 0) {
    query.pestle = { $in: filters.pests };
  }

  if (filters.sources && filters.sources.length > 0) {
    query.source = { $in: filters.sources };
  }

  if (filters.countries && filters.countries.length > 0) {
    query.country = { $in: filters.countries };
  }

  return query;
}

exports.getHome = async (req, res, next) => {
  try {
    const count = await GraphData.find().limit(10);
    res.status(200).json({
      message: "Welcome to the graph data API",
      count: count,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.getAverageLirByRegion = async (req, res, next) => {
  const query = queryMaker(req.query.filter);
  try {
    const aggregatedResult = await GraphData.aggregate([
      {
        $match: query,
      },
      {
        $group: {
          _id: "$region",
          averageLikelihood: { $avg: "$likelihood" },
          averageRelevance: { $avg: "$relevance" },
          averageIntensity: { $avg: "$intensity" },
        },
      },
      {
        $project: {
          _id: 1,
          averageLikelihood: { $trunc: "$averageLikelihood" },
          averageRelevance: { $trunc: "$averageRelevance" },
          averageIntensity: { $trunc: "$averageIntensity" },
        },
      },
    ]);
    res.status(200).json({
      message: "Average LIR by region fetched successfully",
      data: aggregatedResult,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.getTopicDistribution = async (req, res, next) => {
  const query = queryMaker(req.query.filter);
  try {
    const aggregatedResult = await GraphData.aggregate([
      {
        $match: query,
      },
      {
        $group: {
          _id: "$topic",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 1,
          count: 1,
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);
    res.status(200).json({
      message: "Topic distribution fetched successfully",
      data: aggregatedResult,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.getAverageLirByTopic = async (req, res, next) => {
  const query = queryMaker(req.query.filter);
  try {
    const aggregatedResult = await GraphData.aggregate([
      {
        $match: query,
      },
      {
        $group: {
          _id: "$topic",
          averageLikelihood: { $avg: "$likelihood" },
          averageRelevance: { $avg: "$relevance" },
          averageIntensity: { $avg: "$intensity" },
        },
      },
      {
        $project: {
          _id: 1,
          averageLikelihood: { $trunc: "$averageLikelihood" },
          averageRelevance: { $trunc: "$averageRelevance" },
          averageIntensity: { $trunc: "$averageIntensity" },
        },
      },
      {
        $sort: {
          averageIntensity: -1,
        },
      },
    ]);
    res.status(200).json({
      message: "Average LIR by topic fetched successfully",
      data: aggregatedResult,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.getIntensityMedianByCountry = async (req, res, next) => {
  const query = queryMaker(req.query.filter);
  try {
    const aggregatedResult = await GraphData.aggregate([
      {
        $match: query,
      },
      {
        $group: {
          _id: "$country",
          relevance_intensity: {
            $median: {
              input: "$intensity",
              method: "approximate",
            },
          },
        },
      },
      {
        $sort: {
          relevance_intensity: -1,
          _id: 1,
        },
      },
    ]);
    res.status(200).json({
      message: "Intensity Median by Country fetched successfully",
      data: aggregatedResult,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.getAverageIntensityByMonth = async (req, res, next) => {
  const query = queryMaker(req.query.filter);
  try {
    const aggregatedResult = await GraphData.aggregate([
      {
        $match: query,
      },
      {
        $addFields: {
          addedDate: {
            $dateFromString: {
              dateString: "$added",
              format: "%B, %d %Y %H:%M:%S",
            },
          },
        },
      },
      {
        $group: {
          _id: {
            month: { $dateToString: { format: "%Y-%m", date: "$addedDate" } },
          },
          averageIntensity: { $avg: "$intensity" },
        },
      },
      {
        $sort: { "_id.month": 1 },
      },
      {
        $project: {
          _id: 0,
          month: "$_id.month",
          averageIntensity: { $trunc: "$averageIntensity" },
        },
      },
    ]);
    res.status(200).json({
      message: "Average Intensity by Month fetched successfully",
      data: aggregatedResult,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.getCountryDistribution = async (req, res, next) => {
  const query = queryMaker(req.query.filter);
  try {
    const aggregatedResult = await GraphData.aggregate([
      {
        $match: query,
      },
      {
        $group: {
          _id: "$country",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);
    res.status(200).json({
      message: "Country Distribution fetched successfully",
      data: aggregatedResult,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.getAverageLirBySector = async (req, res, next) => {
  const query = queryMaker(req.query.filter);
  try {
    const aggregatedResult = await GraphData.aggregate([
      {
        $match: query,
      },
      {
        $group: {
          _id: "$sector",
          averageLikelihood: { $avg: "$likelihood" },
          averageRelevance: { $avg: "$relevance" },
          averageIntensity: { $avg: "$intensity" },
        },
      },
      {
        $project: {
          _id: 1,
          averageLikelihood: { $trunc: "$averageLikelihood" },
          averageRelevance: { $trunc: "$averageRelevance" },
          averageIntensity: { $trunc: "$averageIntensity" },
        },
      },
    ]);
    res.status(200).json({
      message: "Average LIR by Sector fetched successfully",
      data: aggregatedResult,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.getAverageEndYearBySector = async (req, res, next) => {
  const query = queryMaker(req.query.filter);
  try {
    const aggregatedResult = await GraphData.aggregate([
      {
        $match: query,
      },
      {
        $match: {
          end_year: { $ne: "" },
        },
      },
      {
        $group: {
          _id: "$sector",
          averageEndYear: { $avg: { $toInt: "$end_year" } },
        },
      },
      {
        $sort: { averageEndYear: 1 },
      },
      {
        $project: {
          averageEndYear: { $trunc: "$averageEndYear" },
        },
      },
    ]);
    res.status(200).json({
      message: "Average End Year by Sector fetched successfully",
      data: aggregatedResult,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.getLikelihoodAndRelevanceByIntensity = async (req, res, next) => {
  const query = queryMaker(req.query.filter);
  try {
    const aggregatedResult = await GraphData.aggregate([
      {
        $match: query,
      },
      {
        $group: {
          _id: "$intensity",
          likelihood: { $first: { $ifNull: ["$likelihood", 0] } },
          relevance: { $first: { $ifNull: ["$relevance", 0] } },
        },
      },
      {
        $sort: { _id: -1 },
      },
      {
        $project: {
          _id: 0,
          intensity: "$_id",
          likelihood: 1,
          relevance: 1,
        },
      },
    ]);
    res.status(200).json({
      message: "Likelihood and Relevance by Intensity fetched successfully",
      data: aggregatedResult,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
