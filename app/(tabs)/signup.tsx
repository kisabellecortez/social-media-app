import {useState} from "react";

// import {Auth} from "aws-amplify";

import {
    View, 
    Text,
    TextInput,
    TouchableOpacity, 
    StyleSheet,
    Button, 
    Image
} from "react-native";

export default function SignUpScreen(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")

    const [passwordVisible, setPasswordVisible] = useState(false)

    const handleCreateAccount = async() => {
        try{
            console.log("User created: ", username)
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
            <Text style={styles.title}>Create an Account</Text>

            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
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

            <TextInput
                placeholder="Full Name"
                value={name}
                onChangeText={setName}
                style={styles.input}
                autoCapitalize="none"
            />

            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                style={styles.input}
                autoCapitalize="none"
            />

            <Button 
                title="Continue" 
                onPress={handleCreateAccount}
            />
        </View>
    )
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