const Card = ({ name,surname,nickname,link}) => {
    return (
        <div className='card'>
            <div className="card-wrapper">
                <img className="image" src="https://cdn.motor1.com/images/mgl/kJWEN/s1/2020-porsche-taycan.jpg" alt="React Image"  />
                <div className="card-text-wrapper"> 
                    <div className="header"> {name}</div>
                    <div className="subheader">{surname}</div>
                    <div className="description"> {nickname}</div>
                    <div className="link" ><a href="https://www.porsche.com.tr/modeller/taycan">{link}</a></div>

                </div>
            </div>
        
        </div>
    );
}


export default Card;
