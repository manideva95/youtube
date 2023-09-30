import { NavigationProp } from '@react-navigation/native';
import * as React from 'react';
import { Button, Text, View } from 'react-native';
type HomeScreenProps = {
    navigation: NavigationProp<any>; // You can replace 'any' with your specific navigator type if needed
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Details')}
            />
        </View>
    );
}