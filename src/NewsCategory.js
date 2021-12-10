import React, {Component} from "react";
import './index.css';

class NewsBar extends Component {
    state = {
        active: "top"
    }

    handleClick = (selected) => {
        this.setState({
            active: selected
        })
    }

    render(){
        const {active} = this.state

        console.log(active)

        return (
            //TODO need to add layout styling
            <div className="gap-8 columns-3">
                <a 
                    href={"/top"}
                    className={active === 'top' ? 'font-extrabold' : ""}>
                    Top Stories
                </a>
                <a 
                    href={"/latest"}
                    onClick={() => this.handleClick('latest')}
                    className={active === "latest" ?'font-extrabold' : ""}>
                    Latest Stories
                </a>
                <a 
                    href={"/best"}
                    className={active === "best" ? 'font-extrabold' : ""}>
                    Best Stories
                </a>
            </div>
        )
    }
}

export default NewsBar