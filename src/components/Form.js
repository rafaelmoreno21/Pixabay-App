import React, { useState } from 'react';
import Error from './Error';
import PropTypes from 'prop-types';

const Form = ({ saveSearch }) => {

    const [term, saveTerm] = useState('');
    const [error, saveError] = useState(false);

    const searchImg = e => {
        e.preventDefault();

        // validar
        if (term.trim() === '') {
            saveError(true);
            return;
        }
        saveError(false);

        // enviar el termino de búsqueda hacia el componente principal
        saveSearch(term);
    }

    return (

        <form
            onSubmit={searchImg}
        >
            <div className="row">
                <div className="form-group col-md-8">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Search"

                        onChange={e => saveTerm(e.target.value)}
                    />
                </div>
                <div className="form-group col-md-4">
                    <input
                        type="submit"
                        className="btn btn-lg btn-danger btn-block"
                        value="Search"
                    />
                </div>
            </div>

            { error ? <Error message="Add a term" /> : null}
        </form>
    );
}


Form.propTypes = {
    saveSearch: PropTypes.func.isRequired,

}


export default Form;