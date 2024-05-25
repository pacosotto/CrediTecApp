import React, { useContext } from "react"
import { Text, View, StyleSheet } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { createStackNavigator } from "@react-navigation/stack"

import EventDetailScreen from "./EventDetailScreen"
import AllEvents from "../screens/HomeScreen"
import CalendarComponent from "./CalendarComponent"
import ProfileScreen from "../screens/ProfileScreen"
import Creditos from "../screens/Creditos"

import AuthContext from "../contexts/AuthContext"
import OtherScreen from "../screens/AsignarCreditos"

const Stack = createStackNavigator()
const BottomTab = createBottomTabNavigator()

const Main = () => {
  const { user } = useContext(AuthContext)
  const noControl = user?.noControl
  console.log(noControl)

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
          component={ProfileScreen}
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
            component={Creditos}
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
