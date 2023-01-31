import React, { useRef, useCallback } from 'react';
import {Animated,Text,PanResponder,} from 'react-native';

const Draggable = (props) => {

    const pan = useRef(new Animated.ValueXY()).current;

    const panResponder = useCallback(
        PanResponder.create({
            onMoveShouldSetPanResponderCapture: () => props.enabled,
            onMoveShouldSetPanResponder: () => props.enabled,
            onPanResponderGrant: () => {
              pan.setOffset({
                x: pan.x._value,
                y: pan.y._value
              });
            },
            onPanResponderMove: (ev, gesture) => {
                pan.setValue(
                    { x: gesture.dx, y: gesture.dy }
                
                )
                
            },
            onPanResponderRelease: () => {
              pan.flattenOffset();
            }
          })
    )//.current;
    return (
        <Animated.View {...props}  style={{
            transform: [{ translateX: pan.x }, { translateY: pan.y }]
          }}
          {...panResponder.panHandlers}>{props.children}</Animated.View>
    );
}


export default Draggable;