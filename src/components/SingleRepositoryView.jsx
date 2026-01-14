import RepositoryItem from "./RepositoryItem";
import { useParams } from "react-router-native";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";
import { format} from 'date-fns' 
import { FlatList, View, StyleSheet, Pressable } from "react-native";
import Text from "./Text";
import * as Linking from "expo-linking";


const styles = StyleSheet.create({
    githubbutton: { 
        backgroundColor: '#FF63E9',
        borderRadius: 5,
        margin: 10,
        padding: 15,
    },
    githubbuttontext: { 
        color: 'white',
        textAlign: 'center',
        fontSize: 18
    },
    separator: { 
        height: 10,
        backgroundColor: "lightgray",
    },
    rating: {
        width: 50,
        height: 50,
        textAlign: "center",
        fontWeight: 'bold',
        paddingTop: 15,
        color: '#FF63E9',
        borderWidth: 1,
        borderRadius: 50 / 2,
        padding: 5,
        borderColor: '#FF63E9',
    },
    rowstyle: {
        backgroundColor: 'white',
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
});

const ItemSeparator = () => <View style={styles.separator} />;


const RepositoryInfo = ({ repository }) => {  
    return (
        <View>
            <RepositoryItem item={repository} />
            <Pressable onPress={() => { Linking.openURL(repository.url) }}>
                <View style={styles.githubbutton}>
                    <Text style={styles.githubbuttontext}>Open in GitHub</Text>
                </View>
            </Pressable>
        </View>
    );
};




const ReviewItem = ({ review }) => { 

    const roundValue = (value) => { 
        if (value >= 1000) {
            return (value / 1000).toFixed(1) + 'k';
        }
        return value;
    }

    const reviewDate = format(new Date(review.createdAt), 'dd.MM.yyyy');  

    return (
        <View style={styles.rowstyle}>
            <View style={{ flexDirection: 'column' }}>
                <Text style={styles.rating}>{roundValue(review.rating)}</Text>
            </View>

            <View style={{ flexDirection: 'column', paddingLeft: 15, flex: 1 }}>

                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>{review.user.username}</Text>
                <Text style={{ marginTop: 5 }}>{reviewDate}</Text>
                <Text style={{ marginTop: 5, marginBottom: 10 }}>{review.text}</Text>

            </View>
        </View>
    );
};



const SingleRepositoryView = () => {  - component

    const { id } = useParams(); 

    const { data, loading } = useQuery(GET_REPOSITORY, { 
        fetchPolicy: 'cache-and-network', 
        variables: { id }
    });


    if (loading) return <Text>Loading...</Text>;

    const repository = data.repository; 

    const reviews = repository.reviews.edges.map(edge => edge.node);  

    return (

        <FlatList

            data={reviews}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => <ReviewItem review={item} />}
            keyExtractor={({ id }) => id}
            ListHeaderComponent={() => <RepositoryInfo repository={repository} />} 
            ListFooterComponent={ItemSeparator}

        />


    );

}


export default SingleRepositoryView;