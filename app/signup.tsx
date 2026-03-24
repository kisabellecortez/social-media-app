import {useState} from "react";
import {
    View, 
    Text,
    TextInput,
    TouchableOpacity, 
    StyleSheet,
    Button, 
    Image
} from "react-native";
import {signIn, signUp, confirmSignUp} from "aws-amplify/auth"
import {useRouter} from "expo-router"

export default function SignUpScreen(){
    const router = useRouter()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [passwordVisible, setPasswordVisible] = useState(true)
    const [error, setError] = useState("")

    const handleCreateAccount = async() => {
        try{
            const result = await signUp({
                username: email, 
                password: password,
                options: {
                    userAttributes: {
                        email: email, 
                        name: name, 
                        nickname: username
                    }
                }
            })

            console.log(result)
            
            router.replace({pathname: "/(tabs)/confirmAccount", params: {email, password}})
        }
        catch(error: any){
            console.log(error)
            if(error.name === 'UsernameExistsException'){
                setError("An account with that username already exists.")
            }
            else if(error.name === 'InvalidPasswordException'){
                setError(error.message)
            }
            else if(error.name === 'InvalidParameterException'){
                if(error.message === "Invalid email address format."){
                    setError("Invalid email address.")
                }
                else{
                    setError(error.message)
                }
            }
            else if(error.name === 'EmptySignUpUsername'){
                setError("Please enter a username.")
            }
            else{
                setError(error.message)
            }
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

            <Text style={{ fontFamily: 'System', color: 'red', marginBottom: 15}}>
                {error}
            </Text>

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