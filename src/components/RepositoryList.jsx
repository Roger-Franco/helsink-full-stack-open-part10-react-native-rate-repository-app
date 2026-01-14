// import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';


const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

// const repositories = [
//   {
//     id: 'jaredpalmer.formik',
//     fullName: 'jaredpalmer/formik',
//     description: 'Build forms in React, without the tears',
//     language: 'TypeScript',
//     forksCount: 1589,
//     stargazersCount: 21553,
//     ratingAverage: 88,
//     reviewCount: 4,
//     ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
//   },
//   {
//     id: 'rails.rails',
//     fullName: 'rails/rails',
//     description: 'Ruby on Rails',
//     language: 'Ruby',
//     forksCount: 18349,
//     stargazersCount: 45377,
//     ratingAverage: 100,
//     reviewCount: 2,
//     ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/4223?v=4',
//   },
//   {
//     id: 'django.django',
//     fullName: 'django/django',
//     description: 'The Web framework for perfectionists with deadlines.',
//     language: 'Python',
//     forksCount: 21015,
//     stargazersCount: 48496,
//     ratingAverage: 73,
//     reviewCount: 5,
//     ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/27804?v=4',
//   },
//   {
//     id: 'reduxjs.redux',
//     fullName: 'reduxjs/redux',
//     description: 'Predictable state container for JavaScript apps',
//     language: 'TypeScript',
//     forksCount: 13902,
//     stargazersCount: 52869,
//     ratingAverage: 0,
//     reviewCount: 0,
//     ownerAvatarUrl: 'https://avatars3.githubusercontent.com/u/13142323?v=4',
//   },
// ];

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryFilter = ({handleFilterChange}) => { 

    return (
        <View>
            <Searchbar
                placeholder="Filter repositories"
                onChangeText={handleFilterChange}
                style={{
                    margin: 10,
                    padding: 5,
                    borderRadius: 40,
                    backgroundColor: theme.colors.appBarBackground,
                    borderWidth: 1,
                    borderColor: theme.colors.appBarBackground,
                    zIndex: 1,
                }}
                autoCapitalize='none'
            />
        </View>
    )
}

const RepositoryListSortMenu = ({handleSortSelection, sortPickerType}) => {
    
    const [visible, setVisible] = useState(false); 

    return (
        <PaperProvider>
            <Menu
                visible={visible}
                style={{
                    borderWidth: 1,
                    borderRadius: 5,
                    width: '90%',
                    top: 50,
                    left: 20,
                    zIndex: 1,
                    
                }}
                onDismiss={() => setVisible(false)}
                anchor={
                    <Button
                    onPress={ () => { setVisible(true) } }
                    icon="menu-down"
                    contentStyle={{ 
                      flexDirection: "row-reverse",
                      backgroundColor: theme.colors.appBarBackground,
                        
                    }}
                  >
                    <Text style={{color: theme.colors.headerFontColor, fontWeight: theme.fontWeights.bold, fontSize: theme.fontSizes.subheading}}>{sortPickerType.slice(0, 1).toUpperCase() + sortPickerType.slice(1)} repositories</Text>
                  </Button>
            }
            >
                
                <Menu.Item title="Select sort type" disabled />
                <Menu.Item onPress={() => {
                    handleSortSelection('latest')
                    setVisible(false)
                    }} title="Latest repositories" />
                <Menu.Item onPress={() => {
                    handleSortSelection('highest')
                    setVisible(false)
                    }} title="Highest rated repositories" />
                <Menu.Item onPress={() => {
                    handleSortSelection('lowest')
                    setVisible(false)
                    }} title="Lowest rated repositories" />
            </Menu>
        </PaperProvider>
    )
}

export const RepositoryListContainer = ({ repositories, sortPickerType, handleSortSelection, handleFilterChange, onEndReach }) => {
    const repositoryNodes = repositories
        ? repositories.edges.map((edge) => edge.node)
        : [];


    return (
        <FlatList
            data={repositoryNodes}
            ListHeaderComponent={
                <>
                    <RepositoryFilter handleFilterChange={handleFilterChange} />
                    <RepositoryListSortMenu handleSortSelection={handleSortSelection} sortPickerType={sortPickerType} />
                </>
            }
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => <RepositoryItem item={item} />}
            ListHeaderComponentStyle={{zIndex: 1}}
            onEndReach={onEndReach}
        />
    );
};

const RepositoryList = () => {
  // const [repositories, setRepositories] = useState();
    const { repositories } = useRepositories();


  // const fetchRepositories = async () => {
  //   // Replace the IP address part with your own IP address!
  //   const response = await fetch('http://192.168.3.46:5001/api/repositories');
  //   const json = await response.json();

  //   console.log(json);

  //   setRepositories(json);
  // };

  // useEffect(() => {
  //   fetchRepositories();
  // }, []);

  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];
    
 
  return (
    <FlatList
      data={repositoryNodes}
      // data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <RepositoryItem item={item} />
      )}
    />
  );
};

export default RepositoryList;