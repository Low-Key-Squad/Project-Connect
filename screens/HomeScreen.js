import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Button } from 'react-native';

const HomeScreen = () => {
    const navigation = useNavigation();

    return (
        <View>
            <Text>This is HomeScreen</Text>
            <Button title="Chat" onPress={() => navigation.navigate("Chat")}/>
        </View>
    )
}