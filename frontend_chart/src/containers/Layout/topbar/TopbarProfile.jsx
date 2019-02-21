import React, {PureComponent} from 'react';
import {Collapse} from 'reactstrap';
import TopbarMenuLink from './TopbarMenuLink';
import Setting from "../../../shared/img/Setting.svg";
const Ava = `${process.env.PUBLIC_URL}/img/ava.png`;

export default class TopbarProfile extends PureComponent {
    static loginData = null;

    constructor() {
        super();

        this.loginData = JSON.parse(localStorage.getItem('logindata'));

        this.state = {
            collapse: false,
        };
    }

    toggle = () => {
        this.setState({collapse: !this.state.collapse});
    };

    render() {
        let username = '';
        if (this.loginData){
            this.loginData.data.username;
        }

        return (
            <div className="topbar__profile">
                <button className="topbar__avatar" onClick={this.toggle}>
                <img src={Setting} />
                </button>
                {this.state.collapse && <button className="topbar__back" onClick={this.toggle}/>}
                <Collapse isOpen={this.state.collapse} className="topbar__menu-wrap">
                    <div className="topbar__menu">
                        <TopbarMenuLink title="Page one" icon="list" path="/pages/one"/>
                        <TopbarMenuLink title="Page two" icon="inbox" path="/pages/two"/>
                        <div className="topbar__menu-divider"/>
                        <TopbarMenuLink title="Log Out" icon="exit" path="/logout"/>
                    </div>
                </Collapse>
            </div>
        );
    }
}
