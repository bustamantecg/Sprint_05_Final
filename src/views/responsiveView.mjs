export function renderizandoPais(pais) {
  return {
    _id: pais._id,
    name: {
      common: pais.name.common,
      official: pais.name.official,
      nativeName: pais.name.nativeName ? Object.fromEntries(pais.name.nativeName) : null,
    },
    independent: pais.independent,
    unMember: pais.unMember,
    currencies: pais.currencies ? Object.fromEntries(pais.currencies) : null,
    capital: pais.capital,
    region: pais.region,
    subregion: pais.subregion,
    languages: pais.languages ? Object.fromEntries(pais.languages) : null,
    borders: pais.borders,
    area: pais.area,
    population: pais.population,
    gini: pais.gini ? Object.fromEntries(pais.gini) : null,
    timezones: pais.timezones,
    continents: pais.continents,    
    capitalInfo: {
      latlng: pais.capitalInfo.latlng,
    },
    creador: pais.creador,
    createdAt: pais.createdAt,
    updatedAt: pais.updatedAt,
  };
}

export function renderizandoListaPaises(paises) {
  return paises.map(pais => renderizandoPais(pais));
}