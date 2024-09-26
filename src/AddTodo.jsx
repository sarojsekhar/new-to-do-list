import { useState } from 'react';
import PropTypes from 'prop-types';

const AddTodo = ({ addTodo }) => {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        addTodo(text);
        setText('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="row mb-3">
                <div className="col-sm-9">
                    <input
                        type="text"
                        className='form-control'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Add new to-do"
                    />
                </div>
                <div className="col-sm-3">
                    <button type="submit" className='btn btn-outline-dark'>Add</button>
                </div>
            </div>
        </form>
    );
};

AddTodo.propTypes = {
    addTodo: PropTypes.func.isRequired
};

export default AddTodo;