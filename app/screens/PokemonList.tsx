import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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

  if (loading) return <Text>Loading...</Text>;

  const renderItem = ({ item }: { item: PokemonListItem }) => {
    const id = getIdFromUrl(item.url);
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

    return (
      <TouchableOpacity
        style={styles.pokemonItem}
        onPress={() =>
          navigation.navigate("PokemonDetail", {
            url: item.url,
            name: item.name,
          })
        }
      >
        <Image source={{ uri: imageUrl }} style={styles.pokemonImage} />
        <Text style={styles.pokemonName}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokedex</Text>
      <FlatList
        data={pokemonList}
        keyExtractor={(item) => item.name}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#CC0000",
    textAlign: "center",
    marginBottom: 16,
    fontFamily: "PokemonSolid",
  },
  listContainer: {
    paddingBottom: 20,
  },
  pokemonItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  pokemonImage: {
    width: 50,
    height: 50,
    marginRight: 12,
  },
  pokemonName: {
    fontSize: 18,
    color: "#333",
    textTransform: "capitalize",
  },
});

export default PokemonList;
