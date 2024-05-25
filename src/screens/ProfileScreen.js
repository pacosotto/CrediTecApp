import RNPickerSelect from "react-native-picker-select"
import React, { useContext, useEffect, useState } from "react"
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native"
import { useFocusEffect } from "@react-navigation/native"
import AuthContext from "../components/AuthContext"
import DateTimePicker from "@react-native-community/datetimepicker"
import IP_ADDRESS from "../../config"

const Tab2Screen = () => {
  const { user } = useContext(AuthContext)
  const [credits, setCredits] = useState({
    crediAca: 0,
    crediCultu: 0,
    crediDepor: 0,
  })
  const [formData, setFormData] = useState({
    nombreEvento: "",
    imgEvento: "",
    categoriaEvento: "",
    resumenEvento: "",
    detallesEvento: "",
    fechaEvento: new Date(),
    showDatePicker: false,
  })

  // Array de números de control especiales
  const specialNoControlArray = ["23456", "12345", "67890", "11111", "22222"]
  const isSpecialUser = specialNoControlArray.includes(user?.noControl)

  const fetchCredits = async () => {
    try {
      if (!user?.noControl) return

      const response = await fetch(
        `${IP_ADDRESS}:3002/api/credits/${user.noControl}`
      )
      const data = await response.json()
      console.log("Data received:", data)
      setCredits(data)
    } catch (error) {
      console.error("Error fetching credits:", error)
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchCredits()
    }, [user])
  )

  const renderProgressBar = (label, value, total, color) => (
    <View style={styles.progressBarContainer}>
      <Text style={styles.progressBarLabel}>{label}</Text>
      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressBarFill,
            { width: `${(value / total) * 100}%`, backgroundColor: color },
          ]}
        />
      </View>
      <Text style={styles.progressBarText}>
        {value}/{total}
      </Text>
    </View>
  )

  const handleFormSubmit = async () => {
    try {
      const response = await fetch(`${IP_ADDRESS}:3002/api/eventos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Error al agregar el evento")
      }

      const data = await response.json()
      Alert.alert("Éxito", "Evento agregado exitosamente")
    } catch (error) {
      Alert.alert("Error", error.message)
    }
  }

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || formData.fechaEvento
    setFormData({
      ...formData,
      fechaEvento: currentDate,
      showDatePicker: false,
    })
  }

  const showDatePicker = () => {
    setFormData({ ...formData, showDatePicker: true })
  }

  if (isSpecialUser) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Agregar un evento</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre del Evento"
          value={formData.nombreEvento}
          onChangeText={(text) => handleInputChange("nombreEvento", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Url de la imagen del evento"
          value={formData.imgEvento}
          onChangeText={(text) => handleInputChange("imgEvento", text)}
        />
        <RNPickerSelect
          onValueChange={(value) => handleInputChange("categoriaEvento", value)}
          items={[
            { label: "Académico", value: "Academico" },
            { label: "Cultural", value: "Cultural" },
            { label: "Deportivo", value: "Deportivo" },
          ]}
          style={pickerSelectStyles}
          placeholder={{ label: "Selecciona una categoría", value: null }}
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Resumen del Evento"
          value={formData.resumenEvento}
          onChangeText={(text) => handleInputChange("resumenEvento", text)}
          multiline
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Detalles del Evento"
          value={formData.detallesEvento}
          onChangeText={(text) => handleInputChange("detallesEvento", text)}
          multiline
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha del Evento"
          value={formData.fechaEvento.toLocaleDateString()}
          onFocus={showDatePicker}
        />
        {formData.showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={formData.fechaEvento}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={handleDateChange}
          />
        )}
        <Button title="Agregar evento" onPress={handleFormSubmit} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Número de Control: {user?.noControl}</Text>
      {renderProgressBar("Académicos", credits.crediAca, 3, "#4CAF50")}
      {renderProgressBar("Culturales", credits.crediCultu, 1, "#2196F3")}
      {renderProgressBar("Deportivos", credits.crediDepor, 1, "#FFC107")}
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  progressBarContainer: {
    width: "100%",
    marginVertical: 10,
  },
  progressBarLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  progressBar: {
    height: 20,
    width: "100%",
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 5,
  },
  progressBarText: {
    textAlign: "right",
    marginTop: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    width: "100%",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
})

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    marginBottom: 10,
    width: "100%",
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    marginBottom: 10,
    width: "100%",
  },
})

export default Tab2Screen
