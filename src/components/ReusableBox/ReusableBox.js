import classNames from 'classnames/bind';
import style from './ReusableBox.module.scss';

const cx = classNames.bind(style);
function ReusableBox({
    container = false,
    key = false,
    image = false,
    name = false,
    date = false,
    TopResults = false,
    hover = false,
    children,
    ...passProps
}) {
    const className = cx('', {
        container,
        TopResults,
        hover,
    });

    const props = {
        ...passProps,
    };

    return (
        <div key={key} className={className} {...props}>
            {container && (
                <>
                    <div className={cx('image')}>
                        <img src={image} />
                    </div>
                    <h3>{name}</h3>
                    <p>{date}</p>
                </>
            )}
            {TopResults && children}
        </div>
    );
}

export default ReusableBox;
