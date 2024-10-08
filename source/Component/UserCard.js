import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const UserCard = ({ user, onToggleDetails, expandedUserId, navigation }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.username}>{user.username}</Text>
      <Text style={styles.email}>{user.email}</Text>
      <Text style={styles.phone}>{user.phone}</Text>
      
      {expandedUserId === user.id && (
        <View style={styles.details}>
          <Text style={styles.detailTitle}>Address:</Text>
          <Text>{user.address.street}, {user.address.city}, {user.address.zipcode}</Text>
          
          <Text style={styles.detailTitle}>Company:</Text>
          <Text>{user.company.name}</Text>
          <Text>{user.company.catchPhrase}</Text>
          <Text>{user.company.bs}</Text>
          
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.detailTitle}>Website:</Text>
            <Text style={{ marginLeft: 5, marginTop: 5, }}>{user.website}</Text>
          </View>
        </View>
      )}
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={onToggleDetails}
        >
          <Text style={styles.buttonText}>
            {expandedUserId === user.id ? 'Hide Details' : 'View All Details'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.push('UserPosts', { userId: user.id,user:user })}
        >
          <Text style={styles.buttonText}>View Posts</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    margin: 10,
    padding: 15,
    width: '95%', // 95% of screen width
    alignSelf: 'center',
    elevation: 3,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: 'gray',
  },
  phone: {
    fontSize: 16,
    color: 'gray',
  },
  buttonContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 10, 
  },
  button: {
    backgroundColor: '#68B24C', 
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1, 
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
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
});

export default UserCard;
