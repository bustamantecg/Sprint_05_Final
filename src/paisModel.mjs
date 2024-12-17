/*
import mongoose from "mongoose";

const PaisSchema = new mongoose.Schema({
  name: {
    common: { type: String, required: true },
    official: { type: String, required: true },
    nativeName: {
      type: Map,
      of: {
        official: { type: String },
        common: { type: String }
      }
    }
  },
  independent: { type: Boolean, required: true },  
  unMember: { type: Boolean, required: true },
  currencies: {
    type: Map,
    of: {
      name: { type: String },
      symbol: { type: String }
    }
  },
  capital: { type: [String], default: [] },
  region: { type: String, required: true },
  subregion: { type: String },
  languages: { type: Map, of: String },    
  borders: { type: [String], default: [] },
  area: { type: Number, required: true },
  population: { type: Number, required: true },
  gini: { type: Map, of: Number },  
  timezones: { type: [String], required: true },
  continents: { type: [String], required: true },  
  capitalInfo: {
    latlng: { type: [Number], default: [] }
  },
  creador: { type: String, required: true }
}, {
  timestamps: true // Añade campos createdAt y updatedAt automáticamente.
}, { collection: 'paises'});

PaisSchema.index({ 'name.official': 1 });

const Pais = mongoose.model('paises', PaisSchema);

export default Pais;
*/