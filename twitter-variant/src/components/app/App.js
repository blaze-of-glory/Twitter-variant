import { Component } from "react";
import AppHeader from "../app-header/AppHeader";
import PostAddForm from "../post-add-form/PostAddForm";
import PostList from "../post-list/PostList";
import PostStatusFilter from "../post-status-filter/PostStatusFilter";
import SearchPanel from "../search-panel/SearchPanel";
import './App.css';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [
                {label:"Выучить HTML", important: true, like: false, id:1},
                {label:"Выучить CSS", important: false, like: false, id:2},
                {label:"Выучить JavaScript", important: false, like: false, id:3}
            ],
            term : "",
            filter: "all"
        }
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggleLiked = this.onToggleLiked.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);
        this.maxId = 4;
    }

    deleteItem(id) {
        this.setState(({data}) =>{ 
           const index = data.findIndex( elem => elem.id === id )
           const newArr = [...data.slice(0, index), ...data.slice(index + 1)];
           return {
               data: newArr
           }
        })    
    }

    addItem (text) {
        const newItem = {
            label: text,
            important: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
            const newArr = [...data,newItem];
            return {
                data: newArr
            }
        })
    }

    onToggleImportant (id){
        this.setState(({data}) => {
            const index = data.findIndex( elem => elem.id === id );
            console.log(index);
 
            const oldProp = data[index];
            const newProp = {...oldProp, important: !oldProp.important};
 
            const newArr= [...data.slice(0, index), newProp, ...data.slice(index + 1)];
 
            return {
                data: newArr
            }
        } )
    }

    onToggleLiked (id){
       this.setState(({data}) => {
           const index = data.findIndex( elem => elem.id === id );
           console.log(index);

           const oldProp = data[index];
           const newProp = {...oldProp, like: !oldProp.like};

           const newArr= [...data.slice(0, index), newProp, ...data.slice(index + 1)];

           return {
               data: newArr
           }
       } )
    }

    searchPost (items, term) {
        if (term.length === 0) {
            return items;
        }

        return items.filter( item => {
            return item.label.indexOf(term) > -1
        });
    }

    filterPost (items, filter) {
        if (filter === "like") {
            return items.filter( item => item.like )
        } else {
            return items
        }
    }

    onUpdateSearch(term) {
        this.setState({term})
    }

    onFilterSelect (filter) {
        this.setState({filter})
    }

    render() {
        const {data, term, filter} = this.state;
        const likesCount = data.filter( item => item.like).length;
        const postsCount = data.length;

        const visiblePosts = this.filterPost(this.searchPost(data, term), filter);

        return (
            <div className="app">
                <AppHeader likesCount={likesCount} postsCount={postsCount}/>
                <div className="search-panel d-flex">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <PostStatusFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
                </div>
                <PostList posts={visiblePosts} 
                          onDelete={this.deleteItem} 
                          onToggleImportant={this.onToggleImportant} 
                          onToggleLiked={this.onToggleLiked}/>
                <PostAddForm onAdd={this.addItem}/>
            </div>
        )
    }
}

 