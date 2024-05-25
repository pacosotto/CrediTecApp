import React, { useContext, useState } from "react"
import { View, Text, TextInput, Button, Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"

import AuthContext from "../contexts/AuthContext"
import IP_ADDRESS from "../../config"

const LoginScreen = () => {
  const navigation = useNavigation()
  const { setUser } = useContext(AuthContext)
  const [numeroControl, setNumeroControl] = useState("")
  const [nip, setNip] = useState("")

  const handleLogin = async () => {
    try {
      const response = await fetch(`${IP_ADDRESS}:3002/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ numeroControl, nip }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Error de autenticación")
      }

      setUser({ noControl: numeroControl })
      navigation.navigate("Main")
    } catch (error) {
      Alert.alert("Error", error.message)
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>CrediTec</Text>
      <TextInput
        style={{
          height: 40,
          width: 300,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
          paddingHorizontal: 10,
        }}
        placeholder="Número de Control"
        onChangeText={(text) => setNumeroControl(text)}
        value={numeroControl}
        keyboardType="numeric"
        autoCapitalize="none"
      />
      <TextInput
        style={{
          height: 40,
          width: 300,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 20,
          paddingHorizontal: 10,
        }}
        placeholder="NIP"
        onChangeText={(text) => setNip(text)}
        value={nip}
        secureTextEntry
      />
      <Button title="Iniciar Sesión" onPress={handleLogin} />
    </View>
  )
}

export default LoginScreen
