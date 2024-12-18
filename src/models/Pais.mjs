import mongoose from "mongoose";

// Eliminar modelo si ya existe para evitar errores de caché
delete mongoose.connection.models["paises"];

const PaisSchema = new mongoose.Schema(
  {
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
    capital: { type: [String], required: true }, // Array de Strings
    borders: { type: [String], default: ["Sin fronteras"] }, // Array de Strings
    area: { type: Number, required: true }, // Número
    population: { type: Number, required: true }, // Número
    gini: { type: mongoose.Schema.Types.Mixed, default: "No disponible" }, // Objeto o String
    timezones: { type: [String], required: true }, // Array de Strings
    creador: { type: String, required: true },
  },
  { timestamps: true }
);

const Pais = mongoose.model("paises", PaisSchema);
export default Pais;
