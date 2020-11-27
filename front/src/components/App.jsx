import React from 'react';
import '../styles/components/App.css';
import {withRouter, Route, Link} from 'react-router-dom';
import UserPage from "./UserPage";
import LoginPage from "./LoginPage";
import RegistrationPage from "./RegistrationPage";
import ProductsAddPage from "./ProductsAddPage";
import ProductsListPage from "./ProductsListPage";
import UserBasketPage from "./UserBasketPage";
import {connect} from "react-redux";

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
                        <Link to='/basket' className='authorization-link'>BASKET</Link>
                        :<div>
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
                    props.user.email.length ?
                        <nav className='prod-show-navbar'>
                            <Link className='link-element' to='/'>catalog</Link>
                            {props.user.email?
                            <Link className='link-element' to='/prodAddPage'>add product</Link>
                            :null}
                            <Link className='link-element' to='/userPage'>user page</Link>
                        </nav>
                        : null
                }
                <Route path='/login'>
                    <LoginPage/>
                </Route>
                <Route path='/register'>
                    <RegistrationPage/>
                </Route>
                <Route path='/userPage'><UserPage/></Route>
                <Route path='/prodAddPage'><ProductsAddPage/></Route>
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
