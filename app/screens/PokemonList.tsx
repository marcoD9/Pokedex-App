import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../../navigation/types";
import { getPokemonList } from "../../services/pokeApi";

type PokemonListNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "PokemonList"
>;

type PokemonListItem = {
  name: string;
  url: string;
};

const PokemonList = () => {
  const navigation = useNavigation<PokemonListNavigationProp>();
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState(true);

  const getIdFromUrl = (url: string) => {
    const parts = url.split("/");
    return parts[parts.length - 2];
  };

  useEffect(() => {
    getPokemonList()
      .then(setPokemonList)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <Text className="flex-1 items-center justify-center">Loading...</Text>
    );

  const renderItem = ({ item }: { item: PokemonListItem }) => {
    const id = getIdFromUrl(item.url);
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("PokemonDetail", {
            url: item.url,
            name: item.name,
          })
        }
        className="bg-white rounded-2xl shadow m-2 p-4 flex-row items-center w-full"
      >
        <View className="bg-gray-300  rounded-2xl p-2 mr-4">
          <Image source={{ uri: imageUrl }} className="w-20 h-20 mx-6" />
        </View>

        <Text className="text-black font-extrabold capitalize flex-1 px-12 text-xl">
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View className="bg-orange-500 items-center pt-8 h-full">
      <Text className="text-white font-extrabold uppercase m-8 text-4xl">
        Pokedex
      </Text>
      <FlatList
        data={pokemonList}
        keyExtractor={(item) => item.name}
        renderItem={renderItem}
        className="w-full px-4"
        contentContainerStyle={{ alignItems: "center" }}
      />
    </View>
  );
};

export default PokemonList;
