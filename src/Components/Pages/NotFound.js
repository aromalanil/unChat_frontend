import React,{useEffect} from 'react'
import image from '../../img/404.webp'

const NotFound = ({history}) => {

    useEffect(() => {
        document.title='Not Found (404) | unChat';
    }, [])

    const goToHome=()=>{
        history.push('/')
    }
    
    return (
        <div className="not-found">
            <img src={image} alt="404"/>
            <div className="content">
                <h1>Not Found</h1>
                <p>The page you are looking for is Not Found</p>
            </div>
            <button onClick={goToHome} className="btn primary-btn">Home</button>
        </div>
    )
}


export default NotFound;
