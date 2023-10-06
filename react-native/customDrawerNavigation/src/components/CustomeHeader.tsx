import React from 'react';
import { Text, TouchableOpacity, View, Image, } from 'react-native';
import EntypoIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomHeader = ({ navigation, title, }: { navigation: any, title: string }) => {

    return (
        <View style={{ flexDirection: 'row', minHeight: 50, backgroundColor: 'white', elevation: 10 }}>
            <TouchableOpacity
                onPress={() => { navigation.toggleDrawer() }}
                style={{ width: 60, justifyContent: 'center', alignItems: 'center', }}
            >
                <>
                    <EntypoIcon name="menu" style={[{ color: 'black', fontSize: 25 }]} />
                </>
            </TouchableOpacity>
            <View style={{ flex: 1, justifyContent: 'center', }}>
                <Text style={{ fontSize: 18, color: 'black', textTransform: 'capitalize', fontWeight: 'bold' }}>{title} </Text>
            </View>
        </View>
    )
}
export default CustomHeader;
