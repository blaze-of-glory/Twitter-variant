import PostListItem from "../post-list-item/PostListItem"
import './PostList.css';

const PostList = ({posts,onDelete,onToggleImportant,onToggleLiked}) => {

    const elements = posts.map((item) => {
        const {id, ...restItem} = item;
        return (
            <li key={id} className="list-group-item">
                <PostListItem {...restItem} 
                    onDelete={() => onDelete(id)} 
                    onToggleImportant={() => onToggleImportant(id)} 
                    onToggleLiked={() => onToggleLiked(id)}/>
            </li>
        )
    })

    return (
        <ul className="app-list list-group">
            {elements}
        </ul>
    ) 
}

export default PostList;