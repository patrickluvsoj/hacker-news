import React, {Component} from "react";
import './index.css';

class NewsBar extends Component {
    state = {
        active: "topstories"
    }

    handleClick = (e, selected) => {
        e.preventDefault()

        this.setState({
            active: selected
        })

        this.props.fetchNews(selected)
    }

    render(){
        const {active} = this.state

        return (
            //TODO need to add layout styling
            <div>
                <a 
                    href={"/top"}
                    onClick={(e) => this.handleClick(e, 'topstories')}
                    className={active === 'topstories' ? 'font-extrabold' : ""}>
                    Top Stories
                </a>
                <a 
                    href={"/latest"}
                    onClick={(e) => this.handleClick(e, 'newstories')}
                    className={active === "newstories" ?'font-extrabold' : ""}>
                    Latest Stories
                </a>
                <a 
                    href={"/best"}
                    onClick={(e) => this.handleClick(e, 'beststories')}
                    className={active === "beststories" ? 'font-extrabold' : ""}>
                    Best Stories
                </a>
            </div>
        )
    }
}

export default NewsBar