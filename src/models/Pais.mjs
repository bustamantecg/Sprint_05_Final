import mongoose from "mongoose";
//const mongoose = require('mongoose');

const PaisSchema = new mongoose.Schema({
  name: {
    common: { type: String, required: true },
    official: { type: String, required: true },
    nativeName: {
      spa: {
        official: { type: String, required: true },
        common: { type: String },
      },
    },
  },
  capital: { type: String, required: true, },
  borders: { type: String, default: 'Sin fronteras', },
  area: { type: String, required: true, },
  population: { type: String, required: true, },
  gini: { type: String, default: 'No disponible', },
  timezones: { type: String, required: true, },
  creador: {type: String, required: true, },
}, { timestamps: true });

// Exporta el modelo
module.exports = mongoose.model('Pais', PaisSchema);
