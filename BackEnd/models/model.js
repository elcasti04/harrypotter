import { DataTypes } from 'sequelize'
import db from '../db/conect.js'

export const Peliculas = db.define('peliculas',{
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    info: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    url: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    }

})