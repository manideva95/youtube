import * as React from 'react';
import { Button, View, Text } from 'react-native';
import CustomHeader from './CustomeHeader';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DrawerStackParamList } from '../router/Router';

type Props = NativeStackScreenProps<DrawerStackParamList, 'Details'>;

export default function DetailsScreen({ navigation }: Props) {
    return (
        <View style={{ flex: 1 }}>
            <CustomHeader title="Details" navigation={navigation} />
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Details Screen</Text>
                <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
                <Button title="Go back" onPress={() => navigation.goBack()} />
            </View>
        </View>
    );
}