import classNames from 'classnames/bind';
import styles from './Collection.module.scss';
import Button from '~/components/button';
const cx = classNames.bind(styles);

function Collection({ to, title, follow, handle, icon }) {
    return (
        <div className={cx('collection')}>
            <div className={cx('container')}>
                {icon}
                <h1>{title}</h1>
                <p>{follow}</p>
                <Button to={to} onClick={(e) => e.focus()}>
                    {handle}
                </Button>
            </div>
        </div>
    );
}

export default Collection;
