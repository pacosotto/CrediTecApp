import React, { useContext, useEffect, useState } from "react"
import { View, StyleSheet } from "react-native"
import { Calendar } from "react-native-calendars"
import { useFocusEffect } from "@react-navigation/native"
import AuthContext from "../components/AuthContext"
import IP_ADDRESS from "../../config"

const Tab2Screen = () => {
  const { user } = useContext(AuthContext)
  const [events, setEvents] = useState({})

  const fetchEvents = async () => {
    try {
      if (!user?.noControl) return

      const response = await fetch(
        `${IP_ADDRESS}:3002/api/events/${user.noControl}`
      )
      const data = await response.json()
      console.log("Events received:", data)

      // Formatear los datos de eventos para que coincidan con la estructura requerida por markedDates
      const formattedEvents = data.reduce((acc, curr) => {
        acc[curr.fechaEvento] = { selected: true, selectedColor: "blue" } // Cambia el color a tu preferencia
        return acc
      }, {})

      setEvents(formattedEvents)
    } catch (error) {
      console.error("Error fetching events:", error)
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchEvents()
    }, [user])
  )

  return (
    <View style={styles.container}>
      <Calendar markedDates={events} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
})

export default Tab2Screen
