import { Sequelize } from "sequelize"

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: true,
  },
  logging: false,
})

export default sequelize
