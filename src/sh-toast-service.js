import React from 'react';
import ReactDOM from 'react-dom';
import ShToast from './sh-toast';

const rootElement = document.createElement('div');
rootElement.classList.add('sh-modal-Dialog-wrapper');
document.body.appendChild(rootElement);

class ShToastService {
    constructor(content, title, icon, timeout, cssClass) {
        this.content = content;
        this.title = title;
        this.cssClass = cssClass || '';
        this.icon = icon || 'icon-info';
        this.timeout = timeout || 2500;
    }

    open() {
        return new Promise((resolve, reject) => {
            const cancel = () => {
                this.close();
                reject();
            };

            ReactDOM.render(
                <ShToast shToastTitle={this.title}
                         shCancel={cancel}
                         shClass={this.cssClass}
                         shToastNotice={this.content}
                         shIcon={this.icon}
                         shSuccess={resolve}
                         shTimeout={this.timeout}
                />
                , rootElement);
        });
    }

    close() {
        this.fadeOut();
        setTimeout(() => {
            ReactDOM.unmountComponentAtNode(rootElement);
        }, 1000)
    }

    fadeOut() {
        document.getElementById('sh-toast').classList.remove('fade-in');
    }
}

export default ShToastService
