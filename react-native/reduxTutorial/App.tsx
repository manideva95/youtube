import { View, Text } from 'react-native'
import React from 'react'
import { store } from './src/app/store'
import { Provider } from 'react-redux'
import Main from './src/main'

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  )
}