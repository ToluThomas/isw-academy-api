import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, } from 'react-native';
import {

    useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { createAsyncStorage } from "@react-native-async-storage/async-storage";
import { client } from '../api';


function AppContent() {
    const safeAreaInsets = useSafeAreaInsets();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    const storage = createAsyncStorage("appDB");

    const getPostsWithAwaitAxios = async (): Promise<void> => {
        try {
            const fetchPosts = await client.get('/posts');
            await storage.setItem("Posts", JSON.stringify(fetchPosts.data));
            setPosts(fetchPosts.data);


            const token = await storage.getItem("Posts");
            console.log("Stored token:", token);
            setError("");
        } catch (err) {
            setError("Error fetching posts");
            // console.error('Error fetching all posts:', err);
        } finally {
            setLoading(false);
        };
    }





    // create a storage instance

    // async function demo() {
    //   await storage.setItem("userToken", "abc123");

    //   const token = await storage.getItem("userToken");
    //   console.log("Stored token:", token); // abc123

    //   await storage.removeItem("userToken");
    // }


    useEffect(() => {
        getPostsWithAwaitAxios();
    }, [])

    return (
        <View style={[styles.container, { paddingVertical: safeAreaInsets.top }]}>
            {loading ? (
                <View style={styles.loadContainer}>
                    <View>
                        <ActivityIndicator size="large" color="#0000ff" />
                        <Text>Loading...</Text>
                    </View>
                </View>
            ) : (
                error ? (
                    <View style={styles.loadContainer}>
                        <Text>{error}</Text>
                    </View>
                ) : (<FlatList<any>
                    data={posts}
                    keyExtractor={item => item.id.toString()}
                    contentInset={safeAreaInsets}
                    refreshControl={<RefreshControl refreshing={loading} onRefresh={getPostsWithAwaitAxios} />}
                    renderItem={({ item }) => (
                        <View style={styles.listContainer}>
                            <Text>
                                <Text style={styles.listItem}>{item.id} {" "}</Text>
                                <Text style={styles.listItem}>{item.title}</Text>
                            </Text>
                            <Text>{item.body}</Text>
                        </View>
                    )}
                />)
            )}
        </View>
    );
}

export default AppContent;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContainer: {
        padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc'
    },
    listItem: {
        fontSize: 18, fontWeight: 'bold'
    }
});