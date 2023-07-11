import classNames from 'classnames/bind';
import styles from './ListBox.module.scss';
import Button from '~/components/button';
const cx = classNames.bind(styles);

function ListBox() {
    return (
        <div className={cx('List-Box')}>
            <div className={cx('header')}>
                <p>Chào buổi tối</p>
                <Button to>Hiện tất cả</Button>
            </div>
            <div className={cx('container')}></div>
        </div>
    );
}

export default ListBox;
