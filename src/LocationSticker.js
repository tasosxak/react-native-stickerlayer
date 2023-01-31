import React , {useState, useRef} from 'react';
import {View,Text, TextInput} from 'react-native';
import Draggable from './Draggable';

const LocationSticker = (props) => {
    
    const [text,setText] = useState('');
    const textref = useRef(null);

    return (
        <Draggable enabled={!props.mode}>
            <View style={{backgroundColor:'rgba(255, 255, 255, 1)' ,alignSelf: 'flex-start', padding:20,borderRadius:10}}>
            <View style={{ flexDirection:'row' , justifyContent:'center'}}>
            <Text style={{fontSize:16}}>📍</Text>
            <TextInput
            value={text}
            ref={textref}
            placeholder={'Add your location...'}
            onSubmitEditing={() => textref.current.blur()} 
            onChangeText={text => setText( text )}
            editable={!props.mode}
            />
            </View>
            </View>
        </Draggable>
    );
}


export default LocationSticker;