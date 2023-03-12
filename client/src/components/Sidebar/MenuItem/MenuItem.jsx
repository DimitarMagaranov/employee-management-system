import { Link } from 'react-router-dom';

import './MenuItem.scss';

const MenuItem = ({ onClick, title, currMenuItem }) => {
    let classes = ['nav-link'];

    if (currMenuItem === title) {
        classes.push('selected');
    }

    return (
        <li>
            <Link className={classes.join(' ')} onClick={() => onClick(title)}>
                {title}
            </Link>
        </li>
    );
};

export default MenuItem;
