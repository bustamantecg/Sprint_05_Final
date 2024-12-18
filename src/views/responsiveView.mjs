export function renderizandoPais(pais) {
  return {
    _id: pais._id,
    name: {
      common: pais.name?.common || null,
      official: pais.name?.official || null,
      nativeName: pais.name?.nativeName
        ? convertirObjeto(pais.name.nativeName)
        : null,
    },
    independent: pais.independent || null,
    unMember: pais.unMember || null,
    currencies: pais.currencies
      ? convertirObjeto(pais.currencies)
      : null,
    capital: Array.isArray(pais.capital)
      ? pais.capital.join(', ')
      : pais.capital || null,
    region: pais.region || null,
    subregion: pais.subregion || null,
    languages: pais.languages
      ? convertirObjeto(pais.languages)
      : null,
    borders: Array.isArray(pais.borders)
      ? pais.borders
      : typeof pais.borders === 'string'
      ? [pais.borders]
      : [],
    
    area: pais.area || null,
    population: pais.population || null,
    gini: pais.gini instanceof Map
      ? Object.fromEntries(pais.gini) // Convertimos el Map en un objeto
      : pais.gini || null, // Mantenemos el valor si ya es un objeto o lo dejamos en null
    timezones: Array.isArray(pais.timezones)
      ? pais.timezones
      : typeof pais.timezones === 'string'
      ? [pais.timezones]
      : [],
    
    /* continents: Array.isArray(pais.continents)
      ? pais.continents.join(', ')
      : null, */
    capitalInfo: {
      latlng: Array.isArray(pais.capitalInfo?.latlng)
        ? pais.capitalInfo.latlng
        : [],
    },
    creador: pais.creador || 'Desconocido',
  };
}

export function renderizandoListaPaises(paises) {
  return Array.isArray(paises)
    ? paises.map((pais) => renderizandoPais(pais))
    : [];
}

// Función auxiliar para convertir objetos simples en clave-valor
function convertirObjeto(obj) {
  if (obj && typeof obj === 'object') {
    if (obj instanceof Map) {
      return Object.fromEntries(obj); // Si es un Map, convertimos a objeto
    }
    return Object.entries(obj).reduce((acc, [clave, valor]) => {
      acc[clave] = valor;
      return acc;
    }, {});
  }
  return null;
}
