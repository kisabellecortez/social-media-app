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
import {useLocalSearchParams, useRouter} from "expo-router";
import {signIn, confirmSignUp} from "aws-amplify/auth"

export default function ConfirmAccountScreen(){
    const router = useRouter()

    const {email, password} = useLocalSearchParams() as {
        email: string, 
        password: string
    }
    const [code, setCode] = useState("")

    const handleConfirmSignUp = async() => {
        try{
            try{
                const result = await confirmSignUp({
                    username: email, 
                    confirmationCode: code
                })
                
                console.log(result)
            }
            catch(error){
                console.log(error)
            }

            const user = await signIn({
                username: email, 
                password: password
            })
            
            console.log("User logged in: ", user)

            router.replace("/(tabs)/userAccount")
        }
        catch(error){
            console.log(error)
        }
    }

    return(
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