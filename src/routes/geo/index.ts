import _ from "lodash"
import express, { Router, Request, Response } from "express"
import Sequelize from "sequelize"

import sequelize, { Network } from "@/models"

import { heatmapQuery } from "@/routes/geo/sql/queries"

const Op = Sequelize.Op
const geoRouter: Router = express.Router()

geoRouter.route("/ipv4").get(async (req: Request, res: Response) => {
  let [minLat = 0, maxLat = 0] = _.map(_.split(_.get(req.query, "lat"), ","), parseFloat)
  let [minLon = 0, maxLon = 0] = _.map(_.split(_.get(req.query, "lon"), ","), parseFloat)

  let networks = await sequelize.query(heatmapQuery, {
    replacements: { minLat, maxLat, minLon, maxLon },
    type: Sequelize.QueryTypes.SELECT,
  })
  res.status(200).json({ networks })
})

export default geoRouter
