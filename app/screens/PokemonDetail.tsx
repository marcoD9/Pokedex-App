import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { RootStackParamList } from "../../navigation/types";
import { getPokemonDetails } from "../../services/pokeApi";

type PokemonDetailRouteProp = RouteProp<RootStackParamList, "PokemonDetail">;

type PokemonDetails = {
  name: string;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: { type: { name: string } }[];
  height: number;
  weight: number;
  abilities: { ability: { name: string } }[];
  base_experience: number;
  stats: {
    stat: { name: string };
    base_stat: number;
  }[];
};

const PokemonDetail = () => {
  const route = useRoute<PokemonDetailRouteProp>();
  const { url } = route.params;

  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getPokemonDetails(url);
        setPokemon(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch Pokémon details");
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [url]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "normal":
        return "bg-gray-400";
      case "fire":
        return "bg-orange-500";
      case "water":
        return "bg-blue-500";
      case "grass":
        return "bg-green-500";
      case "electric":
        return "bg-yellow-400";
      case "fighting":
        return "bg-red-700";
      case "poison":
        return "bg-purple-500";
      case "ground":
        return "bg-yellow-600";
      case "flying":
        return "bg-indigo-300";
      case "bug":
        return "bg-green-400";
      default:
        return "bg-gray-200";
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-gray-600 text-lg">
          Loading Pokémon details...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-red-600 text-lg">
          Error loading Pokémon details: {error}
        </Text>
      </View>
    );
  }

  if (!pokemon) {
    return null;
  }

  const primaryType = pokemon.types[0]?.type.name || "Unknown";
  const backgroundColorClass = getTypeColor(primaryType);

  return (
    <ScrollView className={`flex-1 p-3 ${backgroundColorClass}`}>
      <View className="bg-white rounded-lg shadow-md m-8 flex items-center">
        <Image
          source={{
            uri: pokemon.sprites.other["official-artwork"].front_default,
          }}
          className="w-64 h-64 mb-8"
          resizeMode="contain"
        />
      </View>

      <View className="bg-white rounded-lg shadow-md p-4 space-y-4">
        <Text className="text-lg font-extrabold text-gray-700 capitalize text-center mb-6">
          {pokemon.name}
        </Text>
        <View className="flex flex-row justify-between items-center">
          <Text className="text-lg font-semibold text-gray-700">Types:</Text>
          <View className="flex flex-row gap-2">
            {pokemon.types.map((typeInfo) => (
              <Text
                key={typeInfo.type.name}
                className={`${getTypeColor(
                  typeInfo.type.name
                )} text-white px-2 py-1 rounded-full capitalize`}
              >
                {typeInfo.type.name}
              </Text>
            ))}
          </View>
        </View>

        <View className="flex flex-row justify-between items-center">
          <Text className="text-lg font-semibold text-gray-700">Height:</Text>
          <Text className="text-gray-600">{pokemon.height / 10} m</Text>
        </View>

        <View className="flex flex-row justify-between items-center">
          <Text className="text-lg font-semibold text-gray-700">Weight:</Text>
          <Text className="text-gray-600">{pokemon.weight / 10} kg</Text>
        </View>

        <View className="flex flex-row justify-between items-center">
          <Text className="text-lg font-semibold text-gray-700">
            Base Experience:
          </Text>
          <Text className="text-gray-600">{pokemon.base_experience}</Text>
        </View>

        <View>
          <Text className="text-lg font-semibold text-gray-700 my-2">
            Abilities:
          </Text>
          <View className="flex flex-wrap gap-2">
            {pokemon.abilities.map((abilityInfo) => (
              <Text
                key={abilityInfo.ability.name}
                className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full capitalize"
              >
                {abilityInfo.ability.name}
              </Text>
            ))}
          </View>
        </View>

        <View>
          <Text className="text-lg font-semibold text-gray-700 my-2">
            Stats:
          </Text>
          <View className="space-y-1">
            {pokemon.stats.map((statInfo) => (
              <View
                key={statInfo.stat.name}
                className="flex flex-row justify-between items-center p-2 bg-gray-100 rounded-lg m-2"
              >
                <Text className="text-gray-600 capitalize">
                  {statInfo.stat.name}:
                </Text>
                <Text className="text-blue-600 font-medium">
                  {statInfo.base_stat}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default PokemonDetail;
