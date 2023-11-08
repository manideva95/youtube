import { View, Text, Button } from 'react-native'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, incrementByAmount } from './features/counter/counterSlice'
import { RootState } from './app/store'

export default function Main() {
    const count = useSelector((state: RootState) => state.counter.value)
    const dispatch = useDispatch()
    return (
        <View>
            <Text>Count</Text>
            <Text>{count}</Text>
            <Button
                title="Increment"
                color="#f194ff"
                onPress={() => dispatch(increment())}
            />
            <Button
                title="Decrement"
                color="blue"
                onPress={() => dispatch(decrement())}
            />
            <Button
                title="Increment by 2"
                color="orange"
                onPress={() => dispatch(incrementByAmount(2))}
            />
        </View>
    )
}