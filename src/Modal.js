import { BlurView } from '@react-native-community/blur';
import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { View, ImageBackground, Button, Animated, PanResponder, TouchableOpacity, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    modal: {
        borderRadius: 20,
        paddingTop: 30,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 400,
    }
})

const Modal = forwardRef((props, ref) => {

    const [modalVisible, setModalVisible] = useState(false);
    const modalY = useRef(new Animated.Value(0)).current;

    const closeModal = () => {
        Animated.timing(
            modalY, {
            toValue: 400,
            duration: 200,
            useNativeDriver: true,
        }
        ).start(() => setModalVisible(false))
    }

    const panResponder = useCallback(
        PanResponder.create({
            onMoveShouldSetPanResponderCapture: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {

                // modalY.setOffset(modalY._value);


            },
            onPanResponderMove: (ev, gesture) => {


                console.log(gesture.dy);
                if (gesture.dy > 0) {
                    modalY.setValue(gesture.dy)
                }


            },
            onPanResponderRelease: () => {

                if (modalY._value > 150) {
                    closeModal()
                } else {
                    Animated.timing(
                        modalY, {
                        toValue: 0,
                        duration: 200,
                        useNativeDriver: true,
                    }
                    ).start()
                }


            }
        }))

    useImperativeHandle(ref, () => ({
        toggleModal() {
            modalVisible == true ? closeModal() : openModal();
        }
    }));

    const openModal = () => {
        Animated.timing(
            modalY, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }
        ).start(() => setModalVisible(true))
    }


    return (
        <Animated.View ref={ref} style={[styles.modal, { transform: [{ translateY: modalY }], }]} {...panResponder.panHandlers}>
            <BlurView blurAmount={10} blurType={'xdark'} style={{ flex: 1, borderRadius: 20, padding: 20 }}>
                <View style={{flex:1, alignItems:'center'}}>
                <View style={{height:4, borderRadius:10, width:30, backgroundColor:'gray'}}></View>
                {props.children}
                </View>
            </BlurView>
        </Animated.View>
    )

})


export default Modal;