import PropTypes from 'prop-types';

const TodoItem = ({ todo, toggleComplete, deleteTodo }) => (
    <li className='list-group-item mb-3'>
        <div className="row">
            <div className="col-sm-6">
                <span 
                    className='shadow-lg p-2 my-2 bg-light rounded text-dark'
                    style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                    onClick={() => toggleComplete(todo._id)}
                >
                    {todo.text}
                </span>
            </div>
            <div className="col-sm-4">
                <button className='btn btn-danger btn-sm' onClick={() => deleteTodo(todo._id)}>Delete</button>
            </div>
        </div>
    </li>
);

TodoItem.propTypes = {
    todo: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
    }).isRequired,
    toggleComplete: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired
};

export default TodoItem;