export function renderizandoPais(pais) {
  return {
    _id: pais._id,
    name: {
      common: pais.name.common,
      official: pais.name.official,
      nativeName: pais.name.nativeName ? Object.fromEntries(pais.name.nativeName) : null,
    },
    independent: pais.independent,
    status: pais.status,
    unMember: pais.unMember,
    currencies: pais.currencies ? Object.fromEntries(pais.currencies) : null,
    capital: pais.capital,
    region: pais.region,
    subregion: pais.subregion,
    languages: pais.languages ? Object.fromEntries(pais.languages) : null,
    latlng: pais.latlng,
    landlocked: pais.landlocked,
    borders: pais.borders,
    area: pais.area,
    flag: pais.flag,
    maps: {
      googleMaps: pais.maps.googleMaps,
      openStreetMaps: pais.maps.openStreetMaps,
    },
    population: pais.population,
    gini: pais.gini ? Object.fromEntries(pais.gini) : null,
    fifa: pais.fifa,
    timezones: pais.timezones,
    continents: pais.continents,
    flags: {
      png: pais.flags.png,
      svg: pais.flags.svg,
      alt: pais.flags.alt,
    },
    startOfWeek: pais.startOfWeek,
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