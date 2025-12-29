import { View, StyleSheet, Text, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import { Link } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.colorTab,
    padding: 15,
  },
  containerMenu: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  text: {
    color: 'white',
    fontSize: theme.fontSizes.body,
    fontWeight: theme.fontWeights.bold,
    fontFamily: theme.fonts.main,
  },
});

const AppBar = () => {
  return <View style={styles.container}>
    <ScrollView horizontal>
      <View style={styles.containerMenu}>
        <Pressable>
          <Link to="/">
          <Text style={styles.text}>Repositories!!</Text>
          </Link>
        </Pressable>
        <Link to="/signIn">
          <Text style={styles.text}>SignIn</Text>
        </Link>
    </View>
    </ScrollView>
  </View>;
};

export default AppBar;