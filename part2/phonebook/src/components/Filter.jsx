const Filter = (props) => {
    return (
        <div>
            filter shown with <input value={props.value} onChange={props.handler} />
        </div>
    )
}

export default Filter