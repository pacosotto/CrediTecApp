import React from "react"
import { Text, View, StyleSheet } from "react-native"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import TodosEventos from "./TodosEventos"
import Academicos from "./Academicos"
import Deportivos from "./Deportivos"
import Culturales from "./Culturales"

const TopTab = createMaterialTopTabNavigator()

const CustomTabBarLabel = ({ title }) => {
  return <Text style={styles.customLabel}>{title}</Text>
}

const TopTabNavigator = () => {
  return (
    <TopTab.Navigator
      screenOptions={({ route }) => ({
        tabBarLabel: () => <CustomTabBarLabel title={route.name} />,
        tabBarIndicatorStyle: { backgroundColor: "blue" },
      })}
    >
      <TopTab.Screen name="Todos" component={TodosEventos} />
      <TopTab.Screen name="Académicos" component={Academicos} />
      <TopTab.Screen name="Culturales" component={Culturales} />
      <TopTab.Screen name="Deportivos" component={Deportivos} />
    </TopTab.Navigator>
  )
}

const HomeScreen = () => {
  const insets = useSafeAreaInsets()

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <TopTabNavigator />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
})

export default HomeScreen
