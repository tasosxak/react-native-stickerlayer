import { BlurView } from '@react-native-community/blur';
import React, { useCallback, useRef, useState } from 'react';
import { View, ImageBackground, Button, Animated, PanResponder, TouchableOpacity, Text, StyleSheet, Dimensions, useWindowDimensions } from 'react-native';
import Draggable from './Draggable';
import LocationSticker from './LocationSticker';
import SliderSticker from './SliderSticker';
import Modal from './Modal';




const StickerLayer = (props) => {
    const [previewMode, setPreviewMode] = useState(false);
    const [stickers, setStickers] = useState([]);
    const modal = useRef(null);
    const emojiModal = useRef(null);
    const {width, height} = useWindowDimensions();

    onOptions = () => {
        emojiModal.current.toggleModal()
    }

    emojiSelected = (emoji) => {
        

    }

    onPressBack = () => {

    }

    return (

        <ImageBackground style={{ flex: 1, borderRadius: 20 }} source={{ uri: 'https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' }} resizeMode="cover">

            <View style={{ height:110, flexDirection: 'row', paddingTop: 70, paddingHorizontal: 15, justifyContent: 'space-between' }}>
            <TouchableOpacity onPress={() => onPressBack()}>
                        <BlurView blurType='xdark' blurAmount={1} style={{ padding: 10, borderRadius: 15 }}>
                            <Text style={{color:'lightgray'}}> Back </Text>
                        </BlurView>
                    </TouchableOpacity>
                
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => setPreviewMode(!previewMode)}>
                        <BlurView blurType='xdark' blurAmount={1} style={{ padding: 10, borderRadius: 15 }}>
                            <Text style={{color:'lightgray'}}>Preview</Text>
                        </BlurView>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => modal.current.toggleModal()}>
                        <BlurView blurType='xdark' blurAmount={1} style={{ padding: 10, borderRadius: 15 }}>
                            <Text style={{color:'lightgray'}}>Add</Text>
                        </BlurView>
                    </TouchableOpacity>
                </View>
            </View>

            {stickers.map((sticker, index) => {

                switch (sticker.type) {
                    case "SliderSticker":
                        return <SliderSticker mode={previewMode} options={onOptions} key={index} coordinates={sticker.coordinates} />
                        break;
                    case "LocationSticker":
                        return <LocationSticker mode={previewMode} key={index} coordinates={sticker.coordinates} />
                        break;
                }
            })}

            <Modal ref={modal}>
                <Button onPress={() => setStickers([...stickers, { type: "SliderSticker", coordinates: { x: width*0.5, y: height/2 } }])} title='Slider Sticker'></Button>
                <Button onPress={() => setStickers([...stickers, { type: "LocationSticker", coordinates: { x: width*0.5, y: height/2 } }])} title='Location Sticker'></Button>
            </Modal>
            <Modal ref={emojiModal}>
             <View style={{flex:1, flexWrap:'wrap', flexDirection:'row', justifyContent:'center'}}>
             {['😂','😇','🤪','🤮', '🥰️', '👻', '🫖','😭'].map( (emoji) => <TouchableOpacity key={emoji} onPress={(emoji) => emojiSelected(emoji)}><Text style={{fontSize:64, paddingHorizontal:5}}>{emoji}</Text></TouchableOpacity>)}
             </View>
            </Modal>
        </ImageBackground>
    );
}


export default StickerLayer;