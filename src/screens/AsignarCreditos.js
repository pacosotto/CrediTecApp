import React, { useState } from "react"
import { Picker } from "@react-native-picker/picker"
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native"

import IP_ADDRESS from "../../config"

const AsignarCreditos = () => {
  const [noControl, setNoControl] = useState("")
  const [events, setEvents] = useState([])
  const [selectedEvents, setSelectedEvents] = useState({})

  const handleSearch = () => {
    fetch(`${IP_ADDRESS}:3002/api/eventsAlumno/${noControl}`)
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error fetching events:", error))
  }

  const handleCredit = () => {
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
      <Text style={styles.eventName}>{item.nombreEvento}</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedEvents[item.idEvento] || "sinobtener"}
          style={styles.picker}
          onValueChange={(value) => handlePickerChange(item.idEvento, value)}
        >
          <Picker.Item label="Sin obtener" value="sinobtener" />
          <Picker.Item label="Obtenido" value="obtenido" />
        </Picker>
      </View>
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
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  eventName: {
    flex: 1,
  },
  pickerContainer: {
    flex: 1,
    justifyContent: "center",
  },
  picker: {
    height: 200,
    width: "100%",
  },
})

export default AsignarCreditos
