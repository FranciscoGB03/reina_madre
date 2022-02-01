import React from "react";
import {FaChevronDown, FaChevronUp} from "react-icons/fa";

const IconosSort = ({key_actual, key_sort, order}) => {
    return (<React.Fragment>
        {key_sort === key_actual && order === 'asc' && <FaChevronUp/>}
        {key_sort === key_actual && order === 'desc' && <FaChevronDown/>}
    </React.Fragment>);
}

export default  IconosSort;
