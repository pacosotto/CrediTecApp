import React from 'react'
import {View} from 'react-native'
import StyledText from './StyledText'


const EventStats = props => {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <View>
          <StyledText fontWeight='bold' align='center'>Me gusta:</StyledText>
          <StyledText align='center'>{props.likes}</StyledText>
        </View>
        <View>
          <StyledText align='center' fontWeight='bold'>Fecha:</StyledText>
          <StyledText align='center'>{props.date}</StyledText>
        </View>
      </View>
      
    )
  }

export default EventStats