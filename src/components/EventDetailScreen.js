import React, { useContext, useEffect, useState } from "react"
import { View, Text, Image, StyleSheet, Button, Alert } from "react-native"
import AuthContext from "./AuthContext"
import IP_ADDRESS from "../../config"

const EventDetailScreen = ({ route }) => {
  const { eventId, titulo, descripcion, imagen, fechaEvento } = route.params
  const { user } = useContext(AuthContext)
  const noControl = user?.noControl

  const [isInscrito, setIsInscrito] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkInscripcion = async () => {
      try {
        const response = await fetch(
          `${IP_ADDRESS}:3002/api/events/${noControl}`
        )
        const data = await response.json()

        if (response.ok) {
          const inscrito = data.some((evento) => evento.idEvento === eventId)
          setIsInscrito(inscrito)
        } else {
          setIsInscrito(false)
        }
      } catch (error) {
        console.error("Error al verificar inscripción:", error)
        setIsInscrito(false)
      } finally {
        setLoading(false)
      }
    }

    checkInscripcion()
  }, [noControl, eventId])

  const handleInscribirse = async () => {
    Alert.alert(
      "Confirmar inscripción",
      "¿Estás seguro que deseas inscribirte a este evento? Una vez inscrito no podrás cancelar la inscripción",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Inscripción cancelada"),
          style: "cancel",
        },
        {
          text: "Confirmar",
          onPress: async () => {
            try {
              const response = await fetch(
                `${IP_ADDRESS}:3002/api/inscribirse`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    noControl,
                    idEvento: eventId,
                  }),
                }
              )

              const data = await response.json()

              if (response.ok) {
                Alert.alert(
                  "Inscripción exitosa",
                  "Te has inscrito al evento exitosamente"
                )
                setIsInscrito(true) // Actualizar estado a inscrito
              } else {
                Alert.alert("Error", data.error || "Algo salió mal")
              }
            } catch (error) {
              console.error("Error al inscribirse:", error)
              Alert.alert(
                "Error",
                "No se pudo completar la inscripción. Inténtalo nuevamente más tarde."
              )
            }
          },
        },
      ],
      { cancelable: false }
    )
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Cargando...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: imagen }} style={styles.image} />
      <Text style={styles.title}>{titulo}</Text>
      <Text style={styles.date}>{fechaEvento}</Text>
      <Text style={styles.description}>{descripcion}</Text>
      <Button
        title={isInscrito ? "Inscrito" : "Inscribirse"}
        onPress={handleInscribirse}
        disabled={isInscrito}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    color: "gray",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
})

export default EventDetailScreen
