import Sequelize from 'sequelize'
import sequelize from '../db'

const { Model } = Sequelize

class Category extends Model {}

Category.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'name',
    },
  },
  {
    sequelize,
    modelName: 'category',
  }
)

export default Category
