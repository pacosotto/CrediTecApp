import React, { useState } from "react"
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native"
import IP_ADDRESS from "../../config"

const CreditLookupScreen = () => {
  const [numeroControl, setNumeroControl] = useState("")
  const [credits, setCredits] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    if (!numeroControl) {
      Alert.alert("Error", "Por favor ingresa un número de control.")
      return
    }

    setLoading(true)
    try {
      const response = await fetch(
        `${IP_ADDRESS}:3002/api/credits/${numeroControl}`
      )
      const data = await response.json()

      if (response.ok) {
        setCredits(data)
      } else {
        Alert.alert("Error", data.error || "Número de control no encontrado.")
        setCredits(null)
      }
    } catch (error) {
      console.error("Error fetching credits:", error)
      Alert.alert(
        "Error",
        "No se pudo completar la búsqueda. Inténtalo nuevamente más tarde."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Número de Control"
        value={numeroControl}
        onChangeText={setNumeroControl}
        keyboardType="numeric"
      />
      <Button title="Buscar" onPress={handleSearch} disabled={loading} />
      {loading && <Text>Cargando...</Text>}
      {credits && (
        <View style={styles.creditsContainer}>
          <Text style={styles.creditText}>
            Créditos Académicos: {credits.crediAca}
          </Text>
          <Text style={styles.creditText}>
            Créditos Culturales: {credits.crediCultu}
          </Text>
          <Text style={styles.creditText}>
            Créditos Deportivos: {credits.crediDepor}
          </Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  creditsContainer: {
    marginTop: 20,
  },
  creditText: {
    fontSize: 18,
    marginBottom: 10,
  },
})

export default CreditLookupScreen
