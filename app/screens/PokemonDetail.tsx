import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
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
};

const PokemonDetail = () => {
  const route = useRoute<PokemonDetailRouteProp>();
  const { url } = route.params;

  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPokemonDetails(url)
      .then(setPokemon)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [url]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#CC0000" />
        <Text>Loading Pokémon details...</Text>
      </View>
    );
  }

  if (!pokemon) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Error loading Pokémon details.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.name}>{pokemon.name.toUpperCase()}</Text>
      <Image
        source={{
          uri: pokemon.sprites.other["official-artwork"].front_default,
        }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Type(s):</Text>
        <Text style={styles.infoText}>
          {pokemon.types.map((t) => t.type.name).join(", ")}
        </Text>

        <Text style={styles.infoTitle}>Height:</Text>
        <Text style={styles.infoText}>{pokemon.height / 10} m</Text>

        <Text style={styles.infoTitle}>Weight:</Text>
        <Text style={styles.infoText}>{pokemon.weight / 10} kg</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  name: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#CC0000",
    marginBottom: 20,
    letterSpacing: 2,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 24,
  },
  infoContainer: {
    width: "100%",
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },
  infoTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 12,
    color: "#333",
  },
  infoText: {
    fontSize: 16,
    color: "#555",
    marginTop: 4,
  },
});

export default PokemonDetail;
