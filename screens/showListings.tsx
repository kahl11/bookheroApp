import React, { Component, useState, useEffect, useContext } from 'react';
import { ImageBackground, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, LogBox, Image, ScrollView } from "react-native";
import { styles } from '../styles/style';
import { touchable_styles } from '../styles/touchable_styles'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { white } from 'react-native-paper/lib/typescript/styles/colors';
import { Fragment } from 'react';
import { SafeAreaView } from 'react-native';
import { ENDPOINT } from '@env';
import { useInfiniteQuery, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from "react-query/devtools";
import { isLoaded, isLoading } from 'expo-font';
import { PostPageContext } from '../constants/context';
const axios = require('axios').default;

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: true,
        },
    },
})

const ListingRow = ({ setPostPage, navigation, filter, maxPages }: any) => {
    const [height, setHeight] = useState(0);
    const [pageParam, setPageParam] = useState(0);
    const [endOfpages, setEndOfPages] = useState(0);
    const {
        status,
        data,
        error,
        isFetching,
        isFetchingNextPage,
        isFetchingPreviousPage,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage,
        hasPreviousPage,
    } = useInfiniteQuery(
        ['posts', filter],
        async () => {
            const res = await axios.get(`${ENDPOINT}/getPosts?page=${pageParam}`);
            setPageParam(pageParam + 1);
            return res
        },
        {
            getPreviousPageParam: firstPage => false,
            getNextPageParam: lastPage => false
        }
    )
    return status === 'loading' ? (
        <Text>Loading...</Text>
    ) : status === 'error' ? (
        <Text>Error: {error.message}</Text>
    ) : (
        <ScrollView
            style={[{ paddingTop: 20 }]}
            scrollEventThrottle={100}
            onScroll={(e) => {
                if (e.nativeEvent.contentOffset.y / (height - 500) > 0.8 && !isFetching && pageParam <= maxPages) {
                    fetchNextPage();
                }
            }}
            onContentSizeChange={(width, height) => {
                setHeight(height);
            }}
        >
            { data.pages.map((page) => {
                {
                    return (
                        page.data.map((pageData: (string | number | Date)[]) => {
                            return (
                                <TouchableOpacity style={touchable_styles.productRow}
                                    onPress={() => {
                                        navigation.navigate("individualListing");
                                        setPostPage(pageData[0])
                                    }}
                                >
                                    <View style={touchable_styles.productRowImageView}>
                                        <Image style={touchable_styles.productRowImage} source={{ uri: ENDPOINT + '/' + pageData[4] }}></Image>
                                    </View>
                                    <View style={touchable_styles.productRowTextView}>
                                        <Text style={[touchable_styles.productText, { marginTop: 10 }]}>{pageData[1]}</Text>
                                        <Text style={touchable_styles.productText}>{pageData[6]}</Text>
                                        <Text style={[touchable_styles.productText, { fontSize: 18, marginTop: 10 }]}>${pageData[5]}</Text>
                                        <Text style={[touchable_styles.productText, { marginTop: 10 }]}>By: {pageData[7]}</Text>
                                        <Text style={[touchable_styles.productText, {}]}>{new Date(pageData[8]).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        })
                    );
                }
            })
            }
        </ScrollView>
    )
}

export const showListing = ({ navigation }) => {
    let { postPage, setPostPage } = useContext(PostPageContext);
    const [filter, setFilter] = useState(0);
    const [maxPages, setMaxPages] = useState<number | null>(null);

    const getNumPages = async () => {
        let mp = await axios.get(`${ENDPOINT}/getNumPostPages`);
        setMaxPages(mp.data);
    }
    useEffect(() => { getNumPages() }, [])
    return (
        <Fragment>
            <SafeAreaView style={styles.background} />
            <SafeAreaView style={styles.container}>
                <View style={[styles.container_header, {}]}>
                    <Text style={styles.title_header}>Find Books</Text>
                    <View style={[styles.row, { marginTop: 25 }]}>
                        <TouchableOpacity
                            style={[touchable_styles.halfButtonDark]}
                            onPress={() => setFilter(filter + 1)}
                        >
                            <Text style={touchable_styles.lightText}>Filter</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[touchable_styles.halfButtonDark]}
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
                <QueryClientProvider client={queryClient}>
                    {maxPages ?
                        <ListingRow setPostPage={setPostPage} navigation={navigation} filter={filter} maxPages={maxPages} />
                        : null}
                </QueryClientProvider>
            </SafeAreaView>
        </Fragment>
    );
};
