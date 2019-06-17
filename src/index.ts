import _ from "lodash"
import express, { Express, Request, Response, Router } from "express"
import apicache from "apicache"
import cors from "cors"
import morgan from "morgan"

import geoRouter from "@/routes/geo"

const app: Express = express()
const cacheDuration: string = process.env.CACHE_DURATION || "5 Minutes"
const cache = apicache.options({
  defaultDuration: "5 Minutes",
  appendKey: (req: Request, res: Response) => {
    return `${req.method}-Authorization(${req.query})`
  },
  statusCodes: {
    include: [200],
  },
}).middleware

app.use(cors())
app.use(morgan("tiny"))
app.use(cache(cacheDuration))

const routers: { [k: string]: { router: Router; endpoint: string } } = {
  geo: {
    router: geoRouter,
    endpoint: "/api/geo",
  },
}

_.forEach(routers, router => {
  app.use(router.endpoint, router.router)
})

app.get("*", (req: Request, res: Response) => {
  res.status(404).json({ error: "unknown", message: `unknown endpoint ${req.path}` })
})

console.log(`listening on port ${process.env.PORT}`)
app.listen(process.env.PORT)
