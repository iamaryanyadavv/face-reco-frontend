import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageURL, box }) => {
    const faces = box.map((face, i) => {
        return <div key={i} 
                    className='bounding-box' 
                    style={{top: face.topRow, left:face.leftCol, bottom: face.bottomRow, right:face.rightCol}}>
                </div>
        })
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputimage' alt='' src={imageURL} width='500px' height='auto'></img>
                {faces}
            </div>
        </div>
    )
}

export default FaceRecognition;