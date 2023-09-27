import classNames from 'classnames/bind';
import style from './ReusableBox.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(style);
function ReusableBox({
    container = false,
    key = false,
    image = false,
    name = false,
    artist = false,
    date = false,
    TopResults = false,
    hover = false,
    cricle_Green_Play = false,
    children,
    ...passProps
}) {
    const className = cx('', {
        container,
        TopResults,
        hover,
        cricle_Green_Play,
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
                    <p>{date ? date : artist === 'artist' && 'Nghệ sĩ'}</p>
                    {cricle_Green_Play && (
                        <button className={cx('cricle_Green_Play')}>
                            <FontAwesomeIcon icon={faPlay} />
                        </button>
                    )}
                </>
            )}
            {TopResults && children}
        </div>
    );
}

export default ReusableBox;
