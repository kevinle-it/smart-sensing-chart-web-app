import React, {Component}  from 'react';
import {Link, withRouter}  from 'react-router-dom';
import PropTypes           from 'prop-types';
import TopbarSidebarButton from './TopbarSidebarButton';
import TopbarProfile       from './TopbarProfile';
import TopbarDateFilter    from "./TopbarDateFilter";
import TopbarFilter        from "./TopbarFilter";
import TopbarNotification  from "./TopbarNotification";
import TopbarFullScreen    from "./TopbarFullScreen";
import {ROUTE}             from "../../../constants/constants";

class Topbar extends Component {
    static propTypes = {
        changeMobileSidebarVisibility: PropTypes.func.isRequired,
        changeSidebarVisibility: PropTypes.func.isRequired,
    };
    click = () => {
        this.props.goFull()
    };

    render() {

        const {changeMobileSidebarVisibility, changeSidebarVisibility} = this.props;

        let loginData = JSON.parse(localStorage.getItem('logindata'));
        let pathName = window.location.href;
        let filter = (pathName.includes("/ip") || pathName.includes("/os"))?<div className="d-flex flex-row">
            <TopbarDateFilter/>
            <TopbarFilter/>
        </div>:null
        return (
            <div className="topbar">
                <div className="topbar__wrapper">
                    <div className="topbar__left">
                        <TopbarSidebarButton
                            changeMobileSidebarVisibility={changeMobileSidebarVisibility}
                            changeSidebarVisibility={changeSidebarVisibility}
                        />
                        <Link className="topbar__logo" to={ROUTE.Dashboard}/>
                    </div>
                    <div className="topbar__right">
                        {filter}
                         (<TopbarProfile/>)
                         (<TopbarFullScreen goFull={this.click}/>)
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Topbar);
