import {
  NavigationContainer,
  NavigationIndependentTree,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import PokemonDetail from "./app/screens/PokemonDetail";
import PokemonList from "./app/screens/PokemonList";
import { RootStackParamList } from "./navigation/types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="PokemonList">
          <Stack.Screen name="PokemonList" component={PokemonList} />
          <Stack.Screen name="PokemonDetail" component={PokemonDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}
