import "../index.css"

const Notification = ({message, msgType}) => {

    if(message === '')
        return null;

    let className = msgType === 'error' ? 'error' : 'info';
    return (<div className={className}>
        {message}
    </div>);
}

export default Notification;