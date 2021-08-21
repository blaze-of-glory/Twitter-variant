import './AppHeader.css';

const AppHeader = ({likesCount,postsCount}) => {
    return (
        <div className="app-header d-flex">
            <h1>Mikhail Pentrunenko</h1>
            <h2>{postsCount} записи, из них понравилось: {likesCount}</h2>
        </div>
    )
}

export default AppHeader;