import React from "react";

class User extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userInfo: {},
            count: 0
        };
    }

    async componentDidMount() {
        const data = await fetch("https://api.github.com/users/lizsalander-14");
        const json = await data.json();
        this.setState({
            userInfo: json
        });
    }

    render() {
        const {login, avatar_url} = this.state.userInfo;

        return (
            <div className="user-card">
                <img src={avatar_url}></img>
                <h2>Name: {this.props.name}</h2>
                <h2>GitUsername: {login}</h2>
                <h2>Count: {this.state.count}</h2>
                <button onClick={() => {this.setState({
                    count: this.state.count + 1
                })}}>
                    Increment count
                </button>
            </div>
        );
    }
}

export default User;