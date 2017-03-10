import React from 'react'
import ReactDOM from 'react-dom';
import ShToast from '../src/sh-toast-service'
import '../node_modules/sh-core/bin/main.css';
import '../node_modules/sh-icons/bin/main.css';
import '../node_modules/sh-buttons/bin/main.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toast: null
        };
        this.openMe = this.openMe.bind(this);
    }


    componentDidMount() {
        this.setState({
            toast: new ShToast('Your content has been saved and is now available to be seen on the interwebbs, how does that make you feel?', 'success', 'icon-envelope', 1000000,'from-top right error')
        })
    }

    simulate() {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('make request to save');
                resolve();
            }, 3000)
        });
    }

    openMe() {
        this.state.toast.open().then(() => {
            return this.simulate();
        }).then(() => {
            return this.state.toast.close();
        })
    }

    render() {
        return (
            <div>
                <button className="sh-btn sh-btn-default" onClick={this.openMe}>Toast Me</button>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));