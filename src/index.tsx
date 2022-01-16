import join from 'lodash/join';
import printMe from "./print";
import avatar from "./assets/img/avatar.jpg";
import "./assets/less/style.less";

function component() {
    const element = document.createElement('div');
    const btn = document.createElement('button');
    const img = new Image();
    img.src = avatar;
    img.classList.add('imgtitle');

    element.innerHTML = join(['hellow', 'webpack'], ' ');

    btn.innerHTML = '点这里, 然后查看 console';
    btn.onclick = printMe;
    element.appendChild(btn);
    element.appendChild(img);

    return element;
}


import * as React from 'react';
import * as ReactDOM from 'react-dom';

class Hellow extends React.Component<any, any> {
    render() {
        return (
            <div>{this.props.toWhat}</div>
        )
    }
}

document.body.appendChild(component());

ReactDOM.render(
    <Hellow toWhat="前端工程化配置" />,
    document.getElementById('app')
)