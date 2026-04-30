import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { PostSelector } from '../../redux/reduxSelectors/postsSelectors';
import AllPost from '../component/AllPost';
import ProfileScreen from './ProfileScreen';

const HomeScreen = () => {
  const { errorMessage } = useSelector(PostSelector);

  return (
    <View style={styles.container}>
      {errorMessage ? (
        <Text>{errorMessage}</Text>
      ) : (
        <>
          <ProfileScreen />
          <AllPost />
        </>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
