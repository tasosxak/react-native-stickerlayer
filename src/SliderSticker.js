import React , {useState, useRef} from 'react';
import { View, Text, TextInput } from 'react-native';
import Draggable from './Draggable';
import Slider from './Slider';


const SliderSticker = (props) => {
    const [position, setPosition] = useState({x:0});
    const [text,setText] = useState('');
    const textref = useRef(null);

   // console.log("slider sticker", props.mode);

    return (
        <Draggable  enabled={!props.mode} onGrant={(position) => { console.log(position); setPosition(position)}}>
            <View style={{backgroundColor:'white' ,alignSelf: 'flex-start', padding:20,borderRadius:10, minWidth:260}}>
            <TextInput
            value={text}
            ref={textref}
            placeholder={'Type your question here...'}
            onSubmitEditing={() => textref.current.blur()} 
            onChangeText={text => setText(text)}
            editable={!props.mode}
            />
            <View style={{padding:15}}>
                <Slider enabled={props.mode} options={props.options}/>
            </View>
            </View>
        </Draggable>
    );
}


export default SliderSticker;