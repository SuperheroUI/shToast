import React from 'react';
import ShCore from 'sh-core';
import './sh-toast.scss';
import 'sh-icons/bin/main.css';

class ShToast extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            classList: {
                displayToast: false,
                fadeIn: false,
                firstRun: true
            }
        };

        this.showToast = this.showToast.bind(this);
    }

    showToast() {
        this.setState({
            classList: {
                displayToast: true
            }
        }, () => {
            setTimeout(() => {
                let classList = {};
                classList.displayToast = true;
                classList.fadeIn = true;

                this.setState({
                    classList: classList
                })
            }, 100)
        })
    }

    componentDidMount() {
        this.showToast(this.props);

        setTimeout(() => {
            this.props.shSuccess();
        }, this.props.shTimeout)
    }


    render() {
        return (
            <div className={'sh-toast ' + ShCore.getClassNames(this.state.classList) +" "+this.props.shClass}
                 id="sh-toast">
                <div className={"sh-toast-content"}>
                    <i id="sh-icons" className={"sh-toast-icon sh-icon " + this.props.shIcon}/>
                    <div id="sh-title" className="sh-toast-title">{this.props.shToastTitle}</div>
                    <div id="sh-body" className="sh-toast-body">
                        {this.props.shToastNotice}
                    </div>
                </div>
            </div>
        )
    }
}

ShToast.propTypes = {
    shIcon: React.PropTypes.string,
    shTimeout: React.PropTypes.number,
    shSuccess: React.PropTypes.func,
    shClass: React.PropTypes.string,
    shToastTitle: React.PropTypes.string,
    shToastNotice: React.PropTypes.string
};

export default ShToast;
