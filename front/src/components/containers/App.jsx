import React from 'react';
import '../../styles/components/App.css';
import {withRouter, Route, Link} from 'react-router-dom';
import UserPage from "./UserPage";
import LoginPage from "./LoginPage";
import SetAdminStatusPage from "./SetAdminStatusPage";
import RegistrationPage from "./RegistrationPage";
import ProductsAddPage from "./ProductsAddPage";
import ProductsListPage from "./ProductsListPage";
import UserBasketPage from "./UserBasketPage";
import {connect} from "react-redux";
import {ErrorMsgPage} from "../pages/ErrorMsgPage";

const mapStateToProps = function (state) {
    return {
        user: state.userReducer,
    }
};

function App(props) {

    return (
        <div className='container'>
            <svg display='none'>
                <symbol viewBox="0 0 24 24" id="facebook">
                    <path
                        d="m15.997 3.985h2.191v-3.816c-.378-.052-1.678-.169-3.192-.169-3.159 0-5.323 1.987-5.323 5.639v3.361h-3.486v4.266h3.486v10.734h4.274v-10.733h3.345l.531-4.266h-3.877v-2.939c.001-1.233.333-2.077 2.051-2.077z"/>
                </symbol>
                <symbol viewBox="0 0 512 512" id="twitter">
                    <g>
                        <path d="M512,97.248c-19.04,8.352-39.328,13.888-60.48,16.576c21.76-12.992,38.368-33.408,46.176-58.016
			c-20.288,12.096-42.688,20.64-66.56,25.408C411.872,60.704,384.416,48,354.464,48c-58.112,0-104.896,47.168-104.896,104.992
			c0,8.32,0.704,16.32,2.432,23.936c-87.264-4.256-164.48-46.08-216.352-109.792c-9.056,15.712-14.368,33.696-14.368,53.056
			c0,36.352,18.72,68.576,46.624,87.232c-16.864-0.32-33.408-5.216-47.424-12.928c0,0.32,0,0.736,0,1.152
			c0,51.008,36.384,93.376,84.096,103.136c-8.544,2.336-17.856,3.456-27.52,3.456c-6.72,0-13.504-0.384-19.872-1.792
			c13.6,41.568,52.192,72.128,98.08,73.12c-35.712,27.936-81.056,44.768-130.144,44.768c-8.608,0-16.864-0.384-25.12-1.44
			C46.496,446.88,101.6,464,161.024,464c193.152,0,298.752-160,298.752-298.688c0-4.64-0.16-9.12-0.384-13.568
			C480.224,136.96,497.728,118.496,512,97.248z"/>
                    </g>
                </symbol>
                <symbol viewBox="0 0 24 24" id="linkedin">
                    <path
                        d="m23.994 24v-.001h.006v-8.802c0-4.306-.927-7.623-5.961-7.623-2.42 0-4.044 1.328-4.707 2.587h-.07v-2.185h-4.773v16.023h4.97v-7.934c0-2.089.396-4.109 2.983-4.109 2.549 0 2.587 2.384 2.587 4.243v7.801z"/>
                    <path d="m.396 7.977h4.976v16.023h-4.976z"/>
                    <path
                        d="m2.882 0c-1.591 0-2.882 1.291-2.882 2.882s1.291 2.909 2.882 2.909 2.882-1.318 2.882-2.909c-.001-1.591-1.292-2.882-2.882-2.882z"/>
                </symbol>
                <symbol viewBox="0 -31 512.00029 512" id="basket">
                    <path
                        d="m15 30h92c8.269531 0 15 6.730469 15 15 0 1.292969-1.898438-16.261719 28.585938 258.113281-16.714844 6.574219-28.585938 22.863281-28.585938 41.886719 0 24.8125 20.1875 44.988281 45 44.988281h17.578125c-1.664063 4.695313-2.578125 9.753907-2.578125 15.011719 0 24.8125 20.1875 45 45 45s45-20.1875 45-45c0-5.257812-.914062-10.316406-2.578125-15.011719h95.160156c-1.667969 4.695313-2.582031 9.753907-2.582031 15.011719 0 24.8125 20.1875 45 45 45s45-20.1875 45-45-20.1875-45-45-45h-240c-8.269531 0-15-6.730469-15-15s6.730469-15 15-15h274.585938c22.089843 0 40.757812-15.8125 44.386718-37.601562l25.824219-154.933594c.722656-4.347656-.5-8.796875-3.351563-12.160156-2.851562-3.363282-7.035156-5.304688-11.445312-5.304688h-45v-75c0-8.285156-6.714844-15-15-15h-120c-8.285156 0-15 6.714844-15 15v15h-75c-8.285156 0-15 6.714844-15 15v45h-51.574219l-8.433593-75.914062c-.492188-24.390626-20.484376-44.085938-44.992188-44.085938h-92c-8.285156 0-15 6.714844-15 15s6.714844 15 15 15zm227 375c0 8.269531-6.730469 15-15 15s-15-6.730469-15-15 6.730469-15.011719 15-15.011719 15 6.742188 15 15.011719zm165 15c-8.269531 0-15-6.730469-15-15 0-8.296875 6.730469-15 15-15s15 6.730469 15 15-6.730469 15-15 15zm-75-360h90v60h-90zm-90 30h60v30h-60zm237.292969 60-22.910157 137.464844c-1.210937 7.265625-7.433593 12.535156-14.796874 12.535156h-261.160157l-16.667969-150zm0 0"/>
                    <path
                        d="m227 270c8.285156 0 15-6.714844 15-15v-60c0-8.285156-6.714844-15-15-15s-15 6.714844-15 15v60c0 8.285156 6.714844 15 15 15zm0 0"/>
                    <path
                        d="m317 270c8.285156 0 15-6.714844 15-15v-60c0-8.285156-6.714844-15-15-15s-15 6.714844-15 15v60c0 8.285156 6.714844 15 15 15zm0 0"/>
                    <path
                        d="m407 270c8.285156 0 15-6.714844 15-15v-60c0-8.285156-6.714844-15-15-15s-15 6.714844-15 15v60c0 8.285156 6.714844 15 15 15zm0 0"/>
                </symbol>
            </svg>
            <header className='header'>
                <div className='header-logo-block'>
                    <Link to='/'>
                        <img
                            alt='site logo'
                            className='header-logo' src='http://cdn.onlinewebfonts.com/svg/img_19826.png'/>
                    </Link>
                    <span className='header-title'>online</span>
                    <span className='header-title shop'>shop</span>
                </div>
                {
                    props.user.email.length ?
                        <Link className='basket-link' to='/basket'>
                            <div className='basket-link-block'>
                                <svg className='basket-icon'>
                                    <use xlinkHref="#basket"/>
                                </svg>
                                <span className='basket-products-count'>{props.user.basketProductsCount}</span>
                            </div>
                        </Link>
                        : <div>
                            <div className='authorization-type'>Having account?</div>
                            <nav className='navbar'>
                                <Link to='/login' className='authorization-link'>Yes</Link>
                                <Link to='/register' className='authorization-link'>No</Link>
                            </nav>
                        </div>
                }
            </header>
            <main>
                {
                    props.user.token ?
                        <nav className='prod-show-navbar'>
                            <Link className='link-element' to='/'>catalog</Link>
                            {props.user.isAdmin ?
                                <>
                                    <Link className='link-element' to='/prodAddPage'>add product</Link>
                                    <Link className='link-element' to='/adminsList'>admins list</Link>
                                </>
                                : null}
                            <Link className='link-element' to='/userPage'>user page</Link>
                        </nav>
                        : null
                }
                <Route path='/login'>
                    <LoginPage/>
                </Route>
                <Route path='/adminsList'>
                    <SetAdminStatusPage/>
                </Route>
                <Route path='/register'>
                    <RegistrationPage/>
                </Route>
                <Route path='/userPage'>
                    {
                        props.user.token ?
                            <UserPage/>
                            : <ErrorMsgPage errMsg={'You are not authorized'}/>
                    }
                </Route>
                <Route path='/prodAddPage'>
                    {
                        props.user.token ?
                            props.user.isAdmin ?
                                <ProductsAddPage/>
                                : <ErrorMsgPage errMsg={'You are not an admin'}/>
                            : <ErrorMsgPage errMsg={'You are not authorized'}/>
                    }
                </Route>
                <Route exact path='/'><ProductsListPage/></Route>
                <Route path='/basket'>
                    <UserBasketPage/>
                </Route>
            </main>
            <footer className='footer'>
                <span className='footer-text'>Students ITechArt Lab 2020</span>
                <nav className='footer-navbar'>
                    <a className='footer-navbar-element'>
                        <svg className='footer-icons'>
                            <use xlinkHref="#twitter"/>
                        </svg>
                    </a>
                    <a className='footer-navbar-element'>
                        <svg className='footer-icons'>
                            <use xlinkHref="#linkedin"/>
                        </svg>
                    </a>
                    <a className='footer-navbar-element'>
                        <svg className='footer-icons'>
                            <use xlinkHref="#facebook"/>
                        </svg>
                    </a>
                </nav>
            </footer>
        </div>
    );
}

export default withRouter(connect(mapStateToProps)(App));
