import _ from "lodash"
import express, { Router, Request, Response } from "express"
import Sequelize from "sequelize"
import { Feature, FeatureCollection } from "geojson"

import sequelize from "@/models"
import { heatmapQuery } from "@/routes/geo/sql/queries"

const geoRouter: Router = express.Router()

geoRouter.route("/ipv4").get(async (req: Request, res: Response) => {
  let [minLat = 0, maxLat = 0] = _.map(_.split(_.get(req.query, "lat"), ","), parseFloat)
  let [minLng = 0, maxLng = 0] = _.map(_.split(_.get(req.query, "lon"), ","), parseFloat)

  let results: { lat: number; lng: number; weight: number }[] = await sequelize.query(heatmapQuery, {
    replacements: { minLat, maxLat, minLng, maxLng },
    type: Sequelize.QueryTypes.SELECT,
  })

  let features = _.map(results, result => {
    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [result.lat, result.lng],
      },
      properties: {
        weight: result.weight,
      },
    } as Feature
  })

  res.status(200).json({ type: "FeatureCollection", features } as FeatureCollection)
})

export default geoRouter
