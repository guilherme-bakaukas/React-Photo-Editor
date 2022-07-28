export default function SliderEditor(props){
    return (
        <input
        className="slider"
        type = 'range'
        min = {props.min}
        max = {props.max}
        value = {props.value}
        onChange = {props.handleChange}
        />
    )
}