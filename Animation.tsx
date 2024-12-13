import { Dimensions, FlatList, Image, StyleSheet, View } from 'react-native';
import Animated, {
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
} from 'react-native-reanimated';

const IMAGES = [
    {
        id: 0,
        uri: 'https://images.pexels.com/photos/13979460/pexels-photo-13979460.jpeg?auto=compress&cs=tinysrgb&w=600',
        title: 'image 1',
        description: 'this is image 1',
    },
    {
        id: 1,
        uri: 'https://images.pexels.com/photos/15934089/pexels-photo-15934089/free-photo-of-blossoms-on-cherry-tree-in-mountains.jpeg?auto=compress&cs=tinysrgb&w=600',
        title: 'image 2',
        description: 'this is image 2',
    },
    {
        id: 2,
        uri: 'https://images.pexels.com/photos/19211468/pexels-photo-19211468/free-photo-of-mountain-village-in-himalayan-mountains.jpeg?auto=compress&cs=tinysrgb&w=600',
        title: 'image 3',
        description: 'this is image 3',
    },
    {
        id: 3,
        uri: 'https://images.pexels.com/photos/4877062/pexels-photo-4877062.jpeg?auto=compress&cs=tinysrgb&w=600',
        title: 'image 4',
        description: 'this is image 4',
    },
    {
        id: 4,
        uri: 'https://images.pexels.com/photos/20730845/pexels-photo-20730845/free-photo-of-cloud-over-evergreen-forest.jpeg?auto=compress&cs=tinysrgb&w=600',
        title: 'image 5',
        description: 'this is image 5',
    },
    {
        id: 5,
        uri: 'https://images.pexels.com/photos/15934092/pexels-photo-15934092/free-photo-of-forest-in-mountains.jpeg?auto=compress&cs=tinysrgb&w=600',
        title: 'image 6',
        description: 'this is image 6',
    },
    {
        id: 6,
        uri: 'https://images.pexels.com/photos/7846481/pexels-photo-7846481.jpeg?auto=compress&cs=tinysrgb&w=600',
        title: 'image 7',
        description: 'this is image 7',
    },
    {
        id: 7,
        uri: 'https://images.pexels.com/photos/9605458/pexels-photo-9605458.jpeg?auto=compress&cs=tinysrgb&w=600',
        title: 'image 8',
        description: 'this is image 8',
    },
    {
        id: 8,
        uri: 'https://images.pexels.com/photos/1539696/pexels-photo-1539696.jpeg?auto=compress&cs=tinysrgb&w=600',
        title: 'image 9',
        description: 'this is image 9',
    },
    {
        id: 9,
        uri: 'https://images.pexels.com/photos/8046592/pexels-photo-8046592.jpeg?auto=compress&cs=tinysrgb&w=600',
        title: 'image 10',
        description: 'this is image 10',
    },
    {
        id: 10,
        uri: 'https://images.pexels.com/photos/5202028/pexels-photo-5202028.jpeg?auto=compress&cs=tinysrgb&w=600',
        title: 'image 11',
        description: 'this is image 11',
    },
    {
        id: 11,
        uri: 'https://images.pexels.com/photos/2443865/pexels-photo-2443865.jpeg?auto=compress&cs=tinysrgb&w=600',
        title: 'image 12',
        description: 'this is image 12',
    },
];

export default function App() {
    const width = Dimensions.get('screen').width;
    const imageWidth = width * 0.7;
    const spacing = 12;
    const imageHeight = imageWidth * 1.75;

    const scrollX = useSharedValue(0);
    const onScroll = useAnimatedScrollHandler(e => {
        scrollX.value = e.contentOffset.x / (imageWidth + spacing);
    });

    const ImageItem = ({ item, imageWidth, imageHeight, scrollX, index }) => {
        const stylez = useAnimatedStyle(() => {
            return {
                transform: [
                    {
                        scale: interpolate(
                            scrollX.value,
                            [index - 1, index, index + 1],
                            [1.6, 1, 1.6],
                        ),
                    },
                    {
                        rotate: `${interpolate(
                            scrollX.value,
                            [index - 1, index, index + 1],
                            [18, 0, -18],
                        )}deg`,
                    },
                ],
            };
        });

        return (
            <View
                style={{
                    width: imageWidth,
                    height: imageHeight,
                    borderRadius: 18,
                    overflow: 'hidden',
                }}>
                <Animated.Image source={{ uri: item.uri }} style={[{ flex: 1 }, stylez]} />
            </View>
        );
    };

    const ImageBackDrop = ({ image, index, scrollX }) => {
        const stylez = useAnimatedStyle(() => {
            return {
                opacity: interpolate(
                    scrollX.value,
                    [index - 1, index, index + 1],
                    [0, 1, 0],
                ),
            };
        });

        return (
            <Animated.Image
                source={{ uri: image }}
                style={[StyleSheet.absoluteFillObject, stylez]}
                blurRadius={18}
            />
        );
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={StyleSheet.absoluteFillObject}>
                {IMAGES.map((item, index) => (
                    <ImageBackDrop
                        key={item.uri}
                        image={item.uri}
                        index={index}
                        scrollX={scrollX}
                    />
                ))}
            </View>
            <Animated.FlatList
                onScroll={onScroll}
                scrollEventThrottle={1000 / 60}
                data={IMAGES}
                renderItem={({ item, index }) => (
                    <ImageItem
                        item={item}
                        imageWidth={imageWidth}
                        imageHeight={imageHeight}
                        scrollX={scrollX}
                        index={index}
                    />
                )}
                bounces={false}
                showsHorizontalScrollIndicator={false}
                horizontal
                style={{ flexGrow: 0 }}
                snapToInterval={imageWidth + spacing}
                decelerationRate={'fast'}
                contentContainerStyle={{
                    gap: spacing,
                    paddingHorizontal: (width - imageWidth) / 2,
                }}
            />
        </View>
    );
}
