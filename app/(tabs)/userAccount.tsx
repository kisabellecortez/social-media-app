import {useState, useEffect} from "react";
import {
    View, 
    Text,
    TextInput,
    TouchableOpacity, 
    StyleSheet,
    Button, 
    Image
} from "react-native";
import {fetchUserAttributes} from "aws-amplify/auth"

export default function UserAccountScreen(){
    const [name, setName] = useState("")
    const [nickname,setNickname] = useState("")

    useEffect(() => {
        const getUserAttributes = async() => {
            const userAttributes = await fetchUserAttributes();

            setName(userAttributes.name ?? "");
            setNickname(userAttributes.nickname ?? "");
        }

        getUserAttributes();
    }, [])

    return(
        <View style={styles.container}>
            <View style={styles.accountContainer}>
                <View style={styles.userParent}>
                    <View style={styles.circle}>
                        <Image
                            source={require('@/assets/images/user.svg')}
                            style={styles.userImg}
                        />
                    </View>
                
                    <View style={styles.usernameParent}>
                        <Text style={styles.name}>
                            {name}
                        </Text>
                        <Text style={styles.nickname}>
                            @{nickname}
                        </Text>

                        <View style={styles.metricsParent}>
                            <View style={styles.metricsChild}>
                                <Text style={styles.name}>
                                    0
                                </Text>
                                <Text style={styles.nickname}>
                                    posts
                                </Text>
                            </View>

                            <View style={styles.metricsChild}>
                                <Text style={styles.name}>
                                    0
                                </Text>
                                <Text style={styles.nickname}>
                                    followers
                                </Text>
                            </View>

                            <View style={styles.metricsChild}>
                                <Text style={styles.name}>
                                    0
                                </Text>
                                <Text style={styles.nickname}>
                                    following
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.postsCollage}>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: "flex-start", 
        alignItems: "center",
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
    accountContainer: {

    },
    name: {
        fontWeight: "bold",
        color: "#000",
    },
    nickname: {
        color: "#8E8E8E",
    },
    circle: {
        width: 100,
        height: 100,
        backgroundColor: "#fff",
        borderRadius: "50%",
        overflow: "hidden",
        marginRight: 20,
    },
    userImg: {
        width: 100,
        height: 100,
        borderRadius: "50%",
        top: 10,
    },
    userParent: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    usernameParent: {
        marginLeft: 10,
    },
    postsCollage: {
        backgroundColor: "#000",
        width: "100%",
        height: "100%",
    },
    metricsParent: {
        flexDirection: "row",
    },
    metricsChild: {
        width: 100,
        marginTop: 10,
    }
});