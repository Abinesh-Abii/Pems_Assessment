import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, Image } from 'react-native';
import UserCard from '../Component/UserCard';
import SimpleLoading from '../Component/SimpleLoading';
import logo from '../images/Logo.jpg';
import { BaseUrl } from '../Common';
import { fetchUsersDatas } from '../Api';

function UserList({ navigation }) {
  const [users, setUsers] = useState([]);
  const [expandedUserId, setExpandedUserId] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [page, setPage] = useState(1); 
  const [hasMore, setHasMore] = useState(true); 
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      if (!hasMore) return; 
console.log({page});

      setLoading(true); 
      try {
        // const response = await fetch(`${BaseUrl}users?_page=${page}&_limit=5`);
       
        const data = await fetchUsersDatas(page)
        setUsers(prevUsers => [...prevUsers, ...data]); 
        console.log(data);
        
        if (data.length < 5) setHasMore(false);
      } catch (error) {
        console.error(error);
        setErrorMessage(error.message);
      } finally {
        setLoading(false); 
      }
    };

    fetchUsers();
  }, [page]); 

  const toggleDetails = (id) => {
    setExpandedUserId(expandedUserId === id ? null : id);
  };

  const loadMoreUsers = () => {
    if (hasMore && !loading) {
      setPage(prevPage => prevPage + 1); 
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome to PEMS Digital</Text>
        <Image source={logo} style={styles.logo} />
      </View>
      
      <SimpleLoading visible={loading} />

      <FlatList
        data={users}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <UserCard
            user={item} 
            onToggleDetails={() => toggleDetails(item.id)} 
            expandedUserId={expandedUserId}
            navigation={navigation} 
          />
        )}
        onEndReached={loadMoreUsers} 
        onEndReachedThreshold={0.1} 
        showsVerticalScrollIndicator={false} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#07ABDD', 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  welcomeText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white', 
  },
  logo: {
    width: 50, 
    height: 50, 
    resizeMode: 'contain', 
  },
});

export default UserList;
