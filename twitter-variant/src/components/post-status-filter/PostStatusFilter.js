import { Component } from 'react';
import './PostStatusFilter.css';

export default  class PostStatusFilter extends Component {
    constructor (props) {
        super(props);
        this.buttons = [
            {title: "all", label: "Все"},
            {title: "like", label: "Понравилось"}
        ]
    }
    render () {
        const buttons = this.buttons.map(({title,label}) => {
            const active = this.props.filter === title;
            const clazz = active ? 'btn-info' : 'btn-outline-secondary'
            return <button key={title} type="button" className={`btn ${clazz}`} onClick={() => this.props.onFilterSelect(title)}>{label}</button>
        })
        return (
            <div className="btn-group">
                {buttons}
            </div>
        )
    }

}
