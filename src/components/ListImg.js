import React from 'react';
import Img from './Img'
import PropTypes from 'prop-types';

const ListImg = ({ images }) => {
    return (
        <div className="col-12 p-5 row">
            {images.map(image => (
                <Img
                    key={image.id}
                    image={image}
                />
            ))}
        </div>
    );
}

ListImg.propTypes = {
    images: PropTypes.array.isRequired,

}


export default ListImg;