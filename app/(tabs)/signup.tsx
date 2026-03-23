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
import {getCurrentUser, signIn, signUp, confirmSignUp} from "aws-amplify/auth"

export default function SignUpScreen(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [code, setCode] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(true)
    const [error, setError] = useState("")
    const [sentConfirmationCode, setSentConfirmationCode] = useState(false)

    const handleCreateAccount = async() => {
        try{
            const result = await signUp({
                username: username, 
                password,
                options: {
                    userAttributes: {
                        email: email,
                        name: name
                    }
                }
            })

            console.log(result)
            
            setSentConfirmationCode(true)
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

    const handleConfirmSignUp = async() => {
        try{
            try{
                const result = await confirmSignUp({
                    username, 
                    confirmationCode: code
                })
                
                console.log(result)
            }
            catch(error){
                console.log(error)
            }

            const user = await signIn({
                username, 
                password
            })
            
            console.log("user logged in: ", user)
        }
        catch(error){
            console.log(error)
        }
    }

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible)
    }

    return !sentConfirmationCode ? (
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
    ) : (
        <View style={styles.container}>
            <Text style={styles.title}>
                Check your email
            </Text>
            <Text style={styles.title}>
                Enter the 6-digit verification code we sent to {email}.
            </Text>

            <TextInput  
                value={code}
                onChangeText={setCode}
                keyboardType="numeric"
                maxLength={6}
                style={styles.input}
            />

            <Button 
                title="Submit" 
                onPress={handleConfirmSignUp}
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