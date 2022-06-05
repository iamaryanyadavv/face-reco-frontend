import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ OnInputChange, OnSubmit }) => {
    return(
        <div className="searchpart">
            <p className='imglinkformtext'>
                {'Through magic this will detect faces in your pictures. Try it out!'}
            </p>
            <div className='search center'>
                <div className="center searchactual">
                    <input className="searchbar" type='text' onChange={OnInputChange} />
                    <button className="button" onClick={OnSubmit}>Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;