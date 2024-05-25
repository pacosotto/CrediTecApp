import React, { useState } from "react"
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native"
import { Picker } from "@react-native-picker/picker"
import IP_ADDRESS from "../../config"

const EventCreditScreen = () => {
  const [noControl, setNoControl] = useState("")
  const [events, setEvents] = useState([])
  const [selectedEvents, setSelectedEvents] = useState({})

  const handleSearch = () => {
    // Consulta GET para obtener los eventos asociados al número de control ingresado
    fetch(`${IP_ADDRESS}:3002/api/eventsAlumno/${noControl}`)
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error fetching events:", error))
  }

  const handleCredit = () => {
    // Aquí puedes enviar la información de los eventos acreditados al servidor
    const creditedEvents = Object.keys(selectedEvents).filter(
      (eventId) => selectedEvents[eventId] === "obtenido"
    )

    fetch(`${IP_ADDRESS}:3002/api/creditEvents`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ noControl, creditedEvents }),
    })
      .then((response) => response.json())
      .then((data) => {
        Alert.alert("Éxito", "Créditos actualizados correctamente")
        setEvents([])
        setSelectedEvents({})
      })
      .catch((error) => console.error("Error updating credits:", error))
  }

  const handlePickerChange = (eventId, value) => {
    setSelectedEvents((prevSelectedEvents) => ({
      ...prevSelectedEvents,
      [eventId]: value,
    }))
  }

  const renderItem = ({ item }) => (
    <View style={styles.eventItem}>
      <Text>{item.nombreEvento}</Text>
      <Picker
        selectedValue={selectedEvents[item.idEvento] || "sinobtener"}
        style={{ height: 50, width: 150 }}
        onValueChange={(value) => handlePickerChange(item.idEvento, value)}
      >
        <Picker.Item label="Sin obtener" value="sinobtener" />
        <Picker.Item label="Obtenido" value="obtenido" />
      </Picker>
    </View>
  )

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Número de control"
        value={noControl}
        onChangeText={setNoControl}
      />
      <Button title="Buscar" onPress={handleSearch} />
      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={(item) => item.idEvento.toString()}
      />
      <Button title="Dar Créditos" onPress={handleCredit} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  eventItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
})

export default EventCreditScreen
