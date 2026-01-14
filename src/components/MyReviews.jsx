import { format} from 'date-fns'
import { FlatList, View, StyleSheet } from "react-native";
import Text from "./Text";


import useMyReviews from "../hooks/useMyReviews";

const styles = StyleSheet.create({
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


const MyReviewItem = ({ me, review }) => { 
    console.log("me", me);
    
    const roundValue = (value) => { 
        if (value >= 1000) {
            return (value / 1000).toFixed(1) + 'k';
        }
        return value;
    }

    const reviewDate = format(new Date(review.createdAt), 'dd.MM.yyyy'); // format the date

    return (
        <View style={styles.rowstyle}>
            <View style={{ flexDirection: 'column' }}>
                <Text style={styles.rating}>{roundValue(review.rating)}</Text>
            </View>

            <View style={{ flexDirection: 'column', paddingLeft: 15, flex: 1 }}>

                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>{review.repository.fullName}</Text>
                <Text style={{ marginTop: 5 }}>{reviewDate}</Text>
                <Text style={{ marginTop: 5, marginBottom: 10 }}>{review.text}</Text>

            </View>
        </View>
    );
}

const ItemSeparator = () => <View style={styles.separator} />;


const MyReviews = () => { 

    const {me, reviews} = useMyReviews(); 

    const reviewNodes = reviews ? 
    reviews.edges.map(edge => edge.node) : 
    []; 

    if (reviewNodes.length === 0) {
        return (
            <View>
                <Text style={{ textAlign: 'center' }}> No reviews yet </Text>
            </View>
        )
    }

    return (
        <View>
            <FlatList
                data={reviewNodes}
                ItemSeparatorComponent={ItemSeparator}

                renderItem={({ item }) => (
                    <MyReviewItem review={item} me={me} />
                )}
            />
        </View>
    )
}


export default MyReviews;