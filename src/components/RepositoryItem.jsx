import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    padding: 10,
  },
  flexRowView: {
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10
  },
  formattedText: {
    fontWeight: 'bold',
  },
  buttonBase: {
    padding: 10,
    borderRadius: 5,
    color: 'blue',
  },
  buttonBlue: {
    backgroundColor: '#0366d6',
    color: 'white',
    borderRadius: 5,
    padding: 5,
    fontWeight: 'bold',
    maxWidth: 100
  },
  fontFamiyText: {
    fontFamily: theme.fonts.main,
  }
});

const formatNumbers = (number) => {
  return number > 1000 ? `${(number / 1000).toFixed(1)}k` : number;
};

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      {/* <Text>BLAH</Text> */}
      {/* <Text>{item.id}</Text> */}
      <View style={styles.flexRowView}>
        <Image source={{ uri: item.ownerAvatarUrl }} style={{ width: 50, height: 50 }} />
      {/* <Text>{item.ownerAvatarUrl}</Text> */}
      <View>
        <Text style={styles.fontFamiyText}>{item.fullName}</Text>
        <Text style={styles.fontFamiyText}>{item.description}</Text>
        <Pressable>
          <Text style={styles.buttonBlue}>{item.language}</Text>
        </Pressable>
      </View>
      </View>
      <View style={styles.flexRowView}>
        <View>
          <Text style={styles.formattedText}>{formatNumbers(item.stargazersCount)}</Text>
          <Text>Stars</Text>
        </View>
        <View>
          <Text style={styles.formattedText}>{formatNumbers(item.forksCount)}</Text>
          <Text>Forks</Text>
        </View>
        <View> 
          <Text style={styles.formattedText}>{formatNumbers(item.ratingAverage)}</Text>
          <Text>Reviews</Text>
        </View>
        <View>
          <Text style={styles.formattedText}>{formatNumbers(item.reviewCount)}</Text>
          <Text>Rating</Text>
        </View>
      </View>
    </View>
  );
}

export default RepositoryItem;