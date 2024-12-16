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
  status: { type: String, required: true },
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
  latlng: { type: [Number], required: true },
  landlocked: { type: Boolean, required: true },
  borders: { type: [String], default: [] },
  area: { type: Number, required: true },
  flag: { type: String },
  maps: {
    googleMaps: { type: String },
    openStreetMaps: { type: String }
  },
  population: { type: Number, required: true },
  gini: { type: Map, of: Number },
  fifa: { type: String },
  timezones: { type: [String], required: true },
  continents: { type: [String], required: true },
  flags: {
    png: { type: String },
    svg: { type: String },
    alt: { type: String }
  },
  startOfWeek: { type: String, required: true },
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
