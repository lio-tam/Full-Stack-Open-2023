const Notification = ({message, toggleError}) => {
    // inline CSS
    const NotificationStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    const errorStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    if (message == null) return null

    if (toggleError) {
        return (
            <div style={errorStyle}>
                {message}
            </div>
        )
    } else {
        return (
            <div style={NotificationStyle}>
                {message}
            </div>
        )
    }

}

export default Notification