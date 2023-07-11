import classNames from 'classnames/bind';
import style from './ReusableBox.module.scss';

const cx = classNames.bind(style);
function ReusableBox({
    container = false,
    key = false,
    image = false,
    name = false,
    date = false,
    children,
    ...passProps
}) {
    const className = cx('', {
        container,
    });

    const props = {
        ...passProps,
    };

    return (
        <div key={key} className={className} {...props}>
            <div className={cx('image')}>
                <img src={image} />
            </div>
            <h3>{name}</h3>
            <p>{date}</p>
        </div>
    );
}

export default ReusableBox;
