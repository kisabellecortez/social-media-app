import React, {useState} from "react";

import {
    View, 
    Text,
    TextInput,
    TouchableOpacity, 
    StyleSheet,
    Button,
    Image
} from "react-native";

import {signIn} from "aws-amplify/auth"

export default function SignInScreen(){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [passwordVisible, setPasswordVisible] = useState(false)

    const handleLogin = async() => {
        try{
            const result = await signIn({
                username: username,
                password
            })

            console.log(result)
        }
        catch(error){
            console.log(error)
        }
    }

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible)
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <TextInput
                placeholder="Email"
                value={username}
                onChangeText={setUsername}
                style={styles.input}
                autoCapitalize="none"
            />

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    style={styles.inputWithImg}
                    autoCapitalize="none"
                    secureTextEntry={passwordVisible}
                />
                <TouchableOpacity onPress={togglePasswordVisibility}
                        style={{
                        position: "absolute",
                        right: 10,
                        top: "50%",
                        transform: [{ translateY: -15 }]
                    }}
                >
                    <Image
                        source={
                            passwordVisible
                                ? require('@/assets/images/visible.svg')
                                : require('@/assets/images/invisible.svg')
                        }
                        style={styles.visibilityImg}
                    />
                </TouchableOpacity>
            </View>

            <Button 
                title="Log In" 
                onPress={handleLogin}
            />
        </View>
    );
}

const styles = StyleSheet.create({  
    container: {
        flex: 1, 
        justifyContent: "center", 
        padding: 20
    },
    title: {
        fontSize:28, 
        marginBottom: 30, 
        textAlign: "center"
    },
    input: {
        borderWidth: 1, 
        borderColor: "#ccc", 
        padding: 12, 
        marginBottom: 15, 
        borderRadius: 8
    },
    button: {
        backgroundColor: "#007AFF",
        padding: 12, 
        marginBottom: 15, 
        borderRadius: 8
    },
    buttonText: {
        color: "#fff", 
        textAlign: "center",
        fontWeight: "bold"
    },
    visibilityImg: {
        width: 20,
        height: 20,
        position: "absolute",
        right: 10
    },
    inputContainer: {
        position: "relative", 
        justifyContent: "center"
    },
    inputWithImg: {
        borderWidth: 1, 
        borderColor: "#ccc", 
        padding: 12, 
        marginBottom: 15, 
        borderRadius: 8
    },
});