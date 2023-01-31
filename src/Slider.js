import React, { useRef, useCallback , useState, forwardRef} from 'react';
import {Animated,View,Text,PanResponder,} from 'react-native';

const Slider = (props) => {

    const pan = useRef(new Animated.ValueXY()).current;
    const [icon,setIcon] = useState( props.emoji? props.emoji : '😁');
    
    const panResponder = useCallback(
        PanResponder.create({
            onMoveShouldSetPanResponderCapture: () => props.enabled,
            onMoveShouldSetPanResponder: () => props.enabled,
            onPanResponderGrant: () => {
              pan.setOffset({
                x: pan.x._value,
                y: props.bounded? 0 : pan.y._value
              });

              if(props.onGrant)
                props.onGrant({x: pan.x._value, y: pan.y._value})
            },
            onPanResponderMove: (ev, gesture) => {
                pan.setValue(
                    { x: gesture.dx, y: props.bounded? 0 : gesture.dy }
                
                )
                
            },
            onPanResponderTerminate: (evt, gestureState) => {
                if(props.onGrant)
                props.onGrant({x: pan.x._value, y: pan.y._value})
              },
            onPanResponderRelease: () => {
              pan.flattenOffset();
            }
          })
    )//.current;

  
    
    return (
        <View style={{borderRadius:20, backgroundColor:'lightgray', height:12, justifyContent:'center'}}>
        <Animated.View style={{ height:12,borderTopLeftRadius:20, borderBottomLeftRadius:20, width:pan.x.interpolate(
                    {
                    inputRange: [-100,100],
                    outputRange: [props.enabled ? '0%' : '0%', props.enabled ? '100%' :'0%'],
                    extrapolate: 'clamp'
                    }),backgroundColor:'red', justifyContent:'center'}}>
            <Animated.View  style={{
                backgroundColor:'transparent',
                height:30,
                width:30,
                borderRadius:20,
                transform: [{ translateX: pan.x.interpolate(
                    {
                    inputRange: [-100,100],
                    outputRange: [props.enabled ? 0 : 0, props.enabled ? 164 :0],
                    extrapolate: 'clamp'
                    }) }]
            }}
            {...panResponder.panHandlers}><Animated.Text onPress={props.options} style={{marginTop:5,marginLeft:5, fontSize:14, transform:[{scale: pan.x.interpolate ({
              inputRange: [-100,100],
              outputRange: [props.enabled ? 2 :2 , props.enabled ? 3 :2],
              extrapolate: 'clamp'
            }
            )}]}}>{icon}</Animated.Text></Animated.View>
          </Animated.View>
        </View>
    );
}


export default Slider;