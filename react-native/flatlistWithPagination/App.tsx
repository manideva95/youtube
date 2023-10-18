import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  ActivityIndicator
} from 'react-native';
import { getUsers } from './src/service/getUsers';

const UserCard = ({ user }: any) => (
  <View style={styles.cardContainer}>
    <Image style={styles.userImage} source={{ uri: user.picture.large }} />
    <Text style={styles.userName}>{`${user.name.title} ${user.name.first} ${user.name.last}`}</Text>
    <Text style={styles.userInfo}>{`Gender: ${user.gender}`}</Text>
    <Text style={styles.userInfo}>{`Location: ${user.location.city}, ${user.location.state}, ${user.location.country}`}</Text>
    <Text style={styles.userInfo}>{`Email: ${user.email}`}</Text>
    <Text style={styles.userInfo}>{`Date of Birth: ${user.dob.date.substring(0, 10)}`}</Text>
    <Text style={styles.userInfo}>{`Phone: ${user.phone}`}</Text>
    <Text style={styles.userInfo}>{`Cell: ${user.cell}`}</Text>
  </View>
);

const App = () => {

  const [users, setUsers] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  useEffect(() => {
    const initialFunction = async () => {
      setIsLoading(true)
      let users = await getUsers(currentPage)
      setUsers(users)
      console.log(users)
      setIsLoading(false)
    }
    initialFunction()
  }, [])

  const fetchMore = async () => {
    if (isLoading) return;

    setIsLoading(true)
    const nextPage = currentPage + 1;
    let usersList = await getUsers(nextPage)
    setUsers([...users, ...usersList])
    setCurrentPage(nextPage)
    setIsLoading(false)
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={users}
        renderItem={({ item }) => <UserCard user={item} />}
        keyExtractor={item => Math.random().toString(36).substring(2)}
        onEndReached={fetchMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() => (
          isLoading ?
            <ActivityIndicator style={{ marginVertical: 20 }} size="large" color="blue" />
            : null
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    margin: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  userInfo: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default App;