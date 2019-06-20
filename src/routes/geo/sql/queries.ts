export const heatmapQuery = `
select lat, lng, weight from geolite.get_weighted_points(:minLng, :minLat, :maxLng, :maxLat)
`
