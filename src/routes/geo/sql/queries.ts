export const heatmapQuery = `
with total as (
	select
		count(latitude) as total
	from
		geo_ipv4
	where
		latitude between :minLat and :maxLat
		and longitude between :minLng and :maxLng
)

select
	latitude
	,longitude
	,(cast(count(*)  as float) / total) as weight
from
	geo_ipv4
	,total
where
	latitude between :minLat and :maxLat
	and longitude between :minLng and :maxLng
group by latitude, longitude
`
