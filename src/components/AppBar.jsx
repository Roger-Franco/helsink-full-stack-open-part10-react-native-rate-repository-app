import { View, StyleSheet, Text, Pressable } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import { Link } from 'react-router-native'; 
import { ScrollView } from 'react-native'; 

import { useQuery, useApolloClient } from '@apollo/client'; 
import { useNavigate } from 'react-router-native'; 
import { ME } from '../graphql/queries'; 
import useAuthStorage from '../hooks/useAuthStorage'; 


const styles = StyleSheet.create({ 
    container: {
        backgroundColor: theme.colors.appBarBackground,
        paddingTop: Constants.statusBarHeight,
        marginBottom: 15,
    },
    textstyle: { 
        color: theme.colors.headerFontColor,
        paddingTop: 15,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 15,
        fontSize: theme.fontSizes.subheading,
        fontWeight: theme.fontWeights.bold,
    }
});



const AppBar = () => { 
    const { data } = useQuery(ME); 
    const authStorage = useAuthStorage(); 
    const apolloClient = useApolloClient(); 
    const navigate = useNavigate(); 

    let userLoggedIn = false;

    const signOut = async () => { 
        await authStorage.removeAccessToken(); 
        apolloClient.resetStore(); 
        userLoggedIn = false; 
        navigate('/'); 
    };


    userLoggedIn = !data?.me ? false : true; 

    
    return (
        <View style={styles.container}>
            <ScrollView horizontal>
                <Link to="/">
                    <Text style={styles.textstyle}>Repositories</Text>
                </Link>
                {!userLoggedIn &&
                    <>
                        <Link to="/signin">
                            <Text style={styles.textstyle}>Sign in</Text>
                        </Link>
                        <Link to="/signup">
                            <Text style={styles.textstyle}>Sign up</Text>
                        </Link>
                    </>
                }
                {userLoggedIn &&

                    <>

                        <Link to="/review">
                            <Text style={styles.textstyle}>Create a review</Text>
                        </Link>

                        <Link to="/myreviews">
                            <Text style={styles.textstyle}>My reviews</Text>
                        </Link>


                        <Pressable onPress={signOut}>
                            <Text style={styles.textstyle}>Sign out</Text>
                        </Pressable>

                    </>
                }
            </ScrollView>
        </View>
    )

}


export default AppBar;