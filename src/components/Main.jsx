import React, { useContext } from "react"
import { Text, View, StyleSheet } from "react-native"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { MaterialCommunityIcons } from "@expo/vector-icons"

import EventDetailScreen from "./EventDetailScreen"
import AllEvents from "./HomeEvents"
import CalendarComponent from "./CalendarComponent"
import Tab1Screen from "../screens/Tab1Screen"
import Tab2Screen from "../screens/ProfileScreen"
import Tab3Screen from "../screens/Tab3Screen"
import AuthContext from "./AuthContext"
import { createStackNavigator } from "@react-navigation/stack"
import OtherScreen from "../screens/Tab1Screen"

const Stack = createStackNavigator()
const TopTab = createMaterialTopTabNavigator()
const BottomTab = createBottomTabNavigator()

const CustomTabBarLabel = ({ title }) => {
  return <Text style={styles.customLabel}>{title}</Text>
}

const Main = () => {
  const { user } = useContext(AuthContext)
  const noControl = user?.noControl
  console.log(noControl)

  // Array de números de control especiales
  const specialNoControlArray = ["23456", "12345", "67890", "11111", "22222"]
  const isSpecialUser = specialNoControlArray.includes(noControl)
  const profileTabName = isSpecialUser ? "Agregar eventos" : "Perfil"

  return (
    <View style={styles.container}>
      <BottomTab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "blue",
        }}
      >
        <BottomTab.Screen
          name="Inicio"
          component={AllEventsStackNavigator}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" size={24} color={color} />
            ),
          }}
        />
        <BottomTab.Screen
          name={profileTabName}
          component={Tab2Screen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account" size={24} color={color} />
            ),
          }}
        />
        {isSpecialUser ? (
          <BottomTab.Screen
            name="Administracion"
            component={OtherScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="account-eye-outline"
                  size={24}
                  color={color}
                />
              ),
            }}
          />
        ) : (
          <BottomTab.Screen
            name="Eventos"
            component={CalendarComponent}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="calendar"
                  size={24}
                  color={color}
                />
              ),
            }}
          />
        )}
        {isSpecialUser ? (
          <BottomTab.Screen
            name="Creditos"
            component={Tab3Screen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="book-information-variant"
                  size={24}
                  color={color}
                />
              ),
            }}
          />
        ) : null}
      </BottomTab.Navigator>
    </View>
  )
}

const TopTabNavigator = () => {
  return (
    <TopTab.Navigator
      screenOptions={({ route }) => ({
        tabBarLabel: () => <CustomTabBarLabel title={route.name} />,
        tabBarIndicatorStyle: { backgroundColor: "blue" },
      })}
    >
      <TopTab.Screen name="Todos" component={AllEvents} />
      <TopTab.Screen name="Académicos" component={Tab1Screen} />
      <TopTab.Screen name="Culturales" component={Tab2Screen} />
      <TopTab.Screen name="Deportivos" component={Tab1Screen} />
    </TopTab.Navigator>
  )
}

const AllEventsStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AllEvents"
        component={AllEvents}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Detalles" component={EventDetailScreen} />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  customLabel: {
    fontSize: 12,
    textAlign: "center",
  },
})

export default Main
