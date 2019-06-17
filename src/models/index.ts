import { Sequelize, Model, DataTypes } from "sequelize"

export class Network extends Model {
  public network!: string
  public geoname_id!: number
  public registered_country_geoname_id!: number
  public represented_country_geoname_id!: string | null
  public is_anonymous_proxy!: boolean
  public is_satellite_provider!: boolean
  public postal_code!: string | null
  public latitude!: number
  public longitude!: number
  public accuracy_radius!: number
}

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./dist/data/ipv4-blocks.sqlite",
})

Network.init(
  {
    network: {
      type: DataTypes.TEXT,
      primaryKey: true,
    },
    geoname_id: {
      type: DataTypes.NUMBER,
    },
    registered_country_geoname_id: {
      type: DataTypes.NUMBER,
    },
    represented_country_geoname_id: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    is_anonymous_proxy: {
      type: DataTypes.BOOLEAN,
    },
    is_satellite_provider: {
      type: DataTypes.BOOLEAN,
    },
    postal_code: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    latitude: {
      type: DataTypes.REAL,
    },
    longitude: {
      type: DataTypes.REAL,
    },
    accuracy_radius: {
      type: DataTypes.NUMBER,
    },
  },
  {
    tableName: "geo_ipv4",
    timestamps: false,
    sequelize,
  }
)

export default sequelize
