import React from 'react';
import { YellowBox } from 'react-native' 

import Routes from './src/routes'

//vai evitar os alertas de problema com websocket 
YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
])

export default function App() { //view = div, text = span, h1, h2...
  return (
    <Routes />
  )
}