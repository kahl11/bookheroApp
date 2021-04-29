import React, { Component, useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, LogBox, Image, ScrollView } from "react-native";
import { styles } from '../styles/style';
import { touchable_styles } from '../styles/touchable_styles'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { white } from 'react-native-paper/lib/typescript/styles/colors';
import { Fragment } from 'react';
import { SafeAreaView } from 'react-native';
import { PROD_ENDPOINT } from '@env';
import { useInfiniteQuery, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from "react-query/devtools";
import { isLoaded, isLoading } from 'expo-font';
const axios = require('axios').default;

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: true,
        },
    },
})

const ListingRow = ({ postingId = null }) => {
    const fetchPosts = ({ pageParam = 0 }) => {
        let responce = axios.get(`${PROD_ENDPOINT}/getPosts?page=` + pageParam);
        // console.log(responce);
        return responce;
    };

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery('posts', fetchPosts, {
        getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
    })
    return status === 'loading' ? (
        <Text>Loading...</Text>
    ) : status === 'error' ? (
        <Text>Error: {error.message}</Text>
    ) : (
        <>
            { data.pages.map((page) => {
                {
                    return(
                    page.data.map((pageData) => {
                        console.log(pageData);
                        return (
                            <View style={touchable_styles.productRow}>
                                <View style={touchable_styles.productRowImage}></View>
                            </View>
                        );
                    })
                    );
                }
            })
            }
        </>
    )
}

export const showListing = ({ navigation }) => {
    return (
        <Fragment>
            <SafeAreaView style={styles.background} />
            <SafeAreaView style={styles.container}>
                <View style={[styles.container_header, {}]}>
                    <Text style={styles.title_header}>Find Books</Text>
                    <View style={[styles.row, { marginTop: 25 }]}>
                        <TouchableOpacity
                            style={[touchable_styles.registerButton, touchable_styles.customerLogin]}
                            onPress={() => { }}
                        >
                            <Text style={touchable_styles.lightText}>Filter</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[touchable_styles.registerButton, touchable_styles.heroLogin]}
                            onPress={() => { navigation.navigate('createListing') }}
                        >
                            <Text style={touchable_styles.lightText}>Create Listing</Text>
                        </TouchableOpacity>
                    </View>
                    <TextInput
                        style={[styles.input, { marginBottom: 10 }]}
                        placeholder="Search"
                    />
                </View>
                <ScrollView style={[{ paddingTop: 20 }]} >
                    <QueryClientProvider client={queryClient}>
                        <ListingRow />
                        {/* <ReactQueryDevtools initialIsOpen /> */}
                    </QueryClientProvider>
                </ScrollView>
            </SafeAreaView>
        </Fragment>
    );
};
