const BASE_URL = "https://pokeapi.co/api/v2";

export const getPokemonList = async () => {
  const response = await fetch(`${BASE_URL}/pokemon`);
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokémon list: ${response.status}`);
  }
  const data = await response.json();
  return data.results;
};

export const getPokemonDetails = async (url: string | Request) => {
  try {
    const response = await fetch(url);
    console.log("getPokemonDetails Response:", response);
    if (!response.ok) {
      throw new Error(`Failed to fetch Pokémon details: ${response.status}`);
    }
    const data = await response.json();
    console.log("getPokemonDetails Data:", data);
    return data;
  } catch (error) {
    console.error("Errore durante la fetch dei dettagli del Pokemon:", error);
    throw error;
  }
};
