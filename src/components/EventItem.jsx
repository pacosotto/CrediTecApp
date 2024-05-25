import React from 'react'
import {Image, View, StyleSheet} from 'react-native'
import StyledText from './StyledText'
import EventStats from './EventStats'
import theme from '../theme'

const EventItemHeader = ({eventName, description, eventImage}) => (
  <View style={{flexDirection: 'row', paddingBottom: 2}}>
    <View style={{paddingRight: 10}}>
      <Image style={styles.image} source={{ uri: eventImage}}></Image>
    </View>
    <View style={{flex: 1}}>
      <StyledText fontWeight='bold' style={styles.language}>Titulo: {eventName}</StyledText>
      <StyledText color='secondary'>descripcion: {description}</StyledText>
    </View>
  </View>
)

const EventItem = (props) => {
  return (
    <View key={props.id} style={styles.container}>
      <EventItemHeader {...props} />
      <EventStats {...props} />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingVertical: 5
    },
    language: {
      padding: 4,
      color: theme.colors.white,
      backgroundColor: theme.colors.primary,
      alignSelf: 'flex-start',
      marginVertical: 4,
      borderRadius: 4,
      overflow: 'hidden'
    },
    image: {
      width: 48,
      height: 48,
      borderRadius: 4
    }
})

export default EventItem