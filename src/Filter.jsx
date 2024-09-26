import PropTypes from 'prop-types';

const Filter = ({ setFilter }) => (
    <div className='mb-3'>
        <button className='btn btn-success me-2 mt-2' onClick={() => setFilter('all')}>All</button>
        <button className='btn btn-success me-2 mt-2' onClick={() => setFilter('pending')}>Pending</button>
        <button className='btn btn-success me-2 mt-2' onClick={() => setFilter('completed')}>Completed</button>
    </div>
);

Filter.propTypes = {
    setFilter: PropTypes.func.isRequired
};

export default Filter;