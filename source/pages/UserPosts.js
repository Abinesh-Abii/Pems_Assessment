import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import SimpleLoading from '../Component/SimpleLoading';
import back from '../images/back.png';
import { BaseUrl } from '../Common';
import { fetchUserPosts } from '../Api';

const UserPosts = ({ route, navigation }) => {
  const { userId, user } = route.params; 
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); 
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const fetchPosts = async () => {
    if (!hasMore) return; 

    setLoading(true);
    try {
        console.log({userId,page});
        
    //   const response = await fetch(`${BaseUrl}posts?userId=${userId}&_page=${page}&_limit=5`);
      const data =await fetchUserPosts(userId, page);
      setPosts(prevPosts => [...prevPosts, ...data]); 
      if (data.length < 5) setHasMore(false);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const loadMorePosts = () => {
    if (hasMore && !loading) {
      setPage(prevPage => prevPage + 1); 
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.postCard}>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text>{item.body}</Text>
    </View>
  );

  const renderUserDetails = () => (
    <View style={styles.userCard}>
      <Text style={styles.username}>{user.username}</Text>
      <Text style={styles.userEmail}>{user.email}</Text>
      <Text style={styles.userPhone}>{user.phone}</Text>
      <View style={styles.details}>
        <Text style={styles.detailTitle}>Address:</Text>
        <Text>{user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}</Text>
        
        <Text style={styles.detailTitle}>Company:</Text>
        <Text>{user.company.name}</Text>
        <Text>{user.company.catchPhrase}</Text>
        <Text>{user.company.bs}</Text>
        
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.detailTitle}>Website:</Text>
          <Text style={{ marginLeft: 5,marginTop:5 }}>{user.website}</Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.detailTitle}>Geo Location:</Text>
          <Text style={{ marginLeft: 5,marginTop:5 }}>Lat:{user.address.geo.lat} Lng:{user.address.geo.lng}</Text>
        </View>
      </View>
    </View>
  );

  const goBack = () => {
    navigation.goBack(); 
  };

  return (
    <View style={styles.container}>
      {/* Header Container */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={goBack}>
          <Image 
            source={back} 
            style={styles.backImage} 
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Posts</Text>
      </View>

      {/* Posts List */}
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item,index) => index}
        onEndReached={loadMorePosts}
        onEndReachedThreshold={0.1}
        ListHeaderComponent={renderUserDetails} 
        ListFooterComponent={loading ? <SimpleLoading visible={loading} /> : null}
        contentContainerStyle={styles.flatList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#07ABDD', 
    padding: 15,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    elevation: 2,
  },
  backImage: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 16,
    color: 'gray',
  },
  userPhone: {
    fontSize: 16,
    color: 'gray',
  },
  postCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  details: {
    marginTop: 10,
  },
  detailTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 5,
  },
  flatList: {
    paddingBottom: 20, // Add some space at the bottom for the footer
  },
});

export default UserPosts;
