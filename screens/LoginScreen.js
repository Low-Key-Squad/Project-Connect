import React from "react";
import { View, Text } from 'react-native';
import useAuth from "../hooks/useAuth";

const LoginScreen = () => {
    const { signInWithGoogle } = useAuth();

    return (
        <View>
            <Text>Login</Text>
            <Button title="login" onPress={signInWithGoogle} />
        </View>
    );
};


export default LoginScreen;