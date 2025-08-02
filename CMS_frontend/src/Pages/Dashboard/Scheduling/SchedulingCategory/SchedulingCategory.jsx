import React from 'react';
import { useParams } from 'react-router';

const SchedulingCategory = () => {
      const { category } = useParams()
    return (
        <div>
            {category}
        </div>
    );
};

export default SchedulingCategory;