import { StatusBar } from "expo-status-bar"
import React, { useState, useCallback } from "react"
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  SafeAreaView,
  Image,
  FlatList,
  Button,
} from "react-native"
import { useNavigation, useFocusEffect } from "@react-navigation/native"
import IP_ADDRESS from "../../config"

const ListItem = ({ item }) => {
  const navigation = useNavigation()

  const handlePress = () => {
    navigation.navigate("Detalles", {
      eventId: item.idEvento,
      titulo: item.nombreEvento,
      descripcion: item.detalleEvento,
      imagen: item.imagenEvento,
      fechaEvento: item.fechaEvento,
    })
  }

  return (
    <View style={styles.item}>
      <Image
        source={{ uri: item.imagenEvento }}
        style={styles.itemPhoto}
        resizeMode="cover"
      />
      <Text style={styles.itemText}>{item.nombreEvento}</Text>
      <Text style={styles.itemText}>{item.descEvento}</Text>
      <Button title="Ver detalles" onPress={handlePress} />
    </View>
  )
}

const App = () => {
  const [events, setEvents] = useState([])

  const fetchEvents = useCallback(() => {
    fetch(`${IP_ADDRESS}:3002/api/eventos/culturales`)
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error fetching data:", error))
  }, [])

  useFocusEffect(
    useCallback(() => {
      fetchEvents()
    }, [fetchEvents])
  )

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 1 }}>
        <SectionList
          contentContainerStyle={{ paddingHorizontal: 10 }}
          stickySectionHeadersEnabled={false}
          sections={generateSections(events)}
          renderSectionHeader={({ section }) => (
            <>
              <Text style={styles.sectionHeader}>{section.title}</Text>
              {section.horizontal ? (
                <FlatList
                  horizontal
                  data={section.data}
                  renderItem={({ item }) => <ListItem item={item} />}
                  showsHorizontalScrollIndicator={false}
                />
              ) : (
                <FlatList
                  data={section.data}
                  renderItem={({ item }) => <ListItem item={item} />}
                />
              )}
            </>
          )}
          renderItem={({ item, section }) => {
            if (section.horizontal) {
              return null
            }
            return <ListItem item={item} />
          }}
        />
      </SafeAreaView>
    </View>
  )
}

const generateSections = (events) => {
  const seenIds = new Set()

  const horizontalEvents = events.filter((event) => {
    if (event.horizontal && !seenIds.has(event.idEvento)) {
      seenIds.add(event.idEvento)
      return true
    }
    return false
  })

  const verticalEvents = events.filter((event) => {
    if (!event.horizontal && !seenIds.has(event.idEvento)) {
      seenIds.add(event.idEvento)
      return true
    }
    return false
  })

  return [
    {
      title: "Culturales - Destacados",
      horizontal: true,
      data: horizontalEvents,
    },
    {
      title: "Todos los Eventos Culturales",
      data: verticalEvents,
    },
  ]
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  sectionHeader: {
    fontWeight: "800",
    fontSize: 18,
    color: "#000",
    marginTop: 20,
    marginBottom: 5,
    marginLeft: 10,
  },
  item: {
    margin: 10,
    borderWidth: 2,
    borderColor: "#D3D3D3",
    borderRadius: 4,
    padding: 10,
  },
  itemPhoto: {
    width: "100%",
    height: 0,
    paddingBottom: "20%",
  },
  itemText: {
    color: "#000",
    marginTop: 5,
    marginBottom: 10,
  },
})

export default App
