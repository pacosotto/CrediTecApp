import React from 'react'
import {View, FlatList, Text} from 'react-native'
import events from './data/events'
import EventItem from './EventItem'

const EventsList = () => {
  return (
      <FlatList
        data={events}
        ItemSeparatorComponent={() => <Text> </Text>}
        renderItem={({item: event}) => (
            <EventItem {... event}/>
        )}
      />
  )
}


export default EventsList