import React, {useState} from 'react';
import {noImageProduct} from "../../constants/constantImages";
import '../../styles/components/ShowByPage.css';
import classNames from 'classnames';

export const ShowBuyPage = props => {

    const {buy} = props;

    const [isHistoryOpen, isHistoryOpenSet] = useState(false);

    const productsListClose = () => {
        isHistoryOpenSet(!isHistoryOpen);
    }

    return (
        <>
            <svg display='none'>
                <symbol viewBox="0 0 512.007 512.007" id='open-box'>
                    <g>
                        <g>
                            <path d="M402.124,280.744v82.087l-146.11,84.365l-145.558-84.353v-82.098H75.94v92.045c0,6.156,3.279,11.851,8.606,14.934
			l162.805,94.346c2.675,1.547,5.661,2.324,8.652,2.324c2.98,0,5.96-0.765,8.629-2.313l163.38-94.346
			c5.344-3.084,8.629-8.785,8.629-14.946v-92.045H402.124z"/>
                        </g>
                    </g>
                    <g>
                        <g>
                            <path d="M410.915,169.628l-162.937,91.803l-82.236,43.204L49.581,234.094l53.121-35.012l-18.996-28.822L7.769,220.311
			c-4.947,3.256-7.876,8.825-7.761,14.744s3.256,11.368,8.324,14.434l74.159,44.843l73.636,44.872c2.75,1.68,5.862,2.52,8.98,2.52
			c2.756,0,5.511-0.662,8.031-1.979l91.337-47.996l163.38-92.045L410.915,169.628z"/>
                        </g>
                    </g>
                    <g>
                        <g>
                            <path d="M504.3,220.345l-75.362-50.049l-19.099,28.753l52.684,34.989L346.27,304.635l-81.77-42.945l-162.805-92.045
			l-16.988,30.047l163.271,92.304l90.889,47.748c2.52,1.323,5.275,1.979,8.031,1.979c3.118,0,6.23-0.846,8.992-2.52l73.578-44.837
			l74.211-44.872c5.062-3.06,8.203-8.497,8.324-14.405C512.13,229.182,509.219,223.613,504.3,220.345z"/>
                        </g>
                    </g>
                    <g>
                        <g>
                            <path d="M503.702,119.867L355.854,30.123c-5.16-3.13-11.569-3.342-16.902-0.564l-90.894,47.173
			c-0.201,0.098-0.397,0.207-0.587,0.316l-162.805,92.62l17.069,30.001l162.511-92.453l81.989-42.554l116.328,70.61l-52.73,35.017
			l19.099,28.753l75.362-50.049c4.919-3.268,7.824-8.825,7.703-14.727C511.882,128.364,508.753,122.933,503.702,119.867z"/>
                        </g>
                    </g>
                    <g>
                        <g>
                            <path d="M264.511,77.037c-0.19-0.104-0.374-0.207-0.564-0.305l-90.894-47.173c-5.344-2.784-11.753-2.566-16.902,0.564
			L8.304,119.867c-5.063,3.072-8.192,8.514-8.301,14.434c-0.109,5.92,2.819,11.477,7.761,14.733l75.937,50.049l18.996-28.822
			l-53.162-35.035L165.77,64.663l82.001,42.559l163.104,92.465l17.017-30.03L264.511,77.037z"/>
                        </g>
                    </g>
                </symbol>
                <symbol viewBox="0 0 399.3 399.3" id='close-box'>
                    <g>
                        <g>
                            <path d="M390.15,108.7c-4.4-4.4-187.3-107.8-187.3-107.8c-2-1.2-4.8-1.2-6.8,0l-185.2,114c-2,1.2-3.2,3.2-3.2,5.6v166.4
			c0,2.4,1.2,4.4,3.2,5.6l185.2,106h0.4c0,0,0.4,0,0.4,0.4c0.8,0.4,1.6,0.4,2.4,0.4s1.6,0,2.4-0.4c0.4,0,0.4,0,0.8-0.4
			c0.4,0,0.4,0,0.8-0.4l185.2-116.4c2-1.2,3.2-3.2,3.2-5.6V112.9C391.65,110.4,390.45,109,390.15,108.7z M199.65,14.1l172,98.8
			l-80,50l-176.4-97.2L199.65,14.1z M193.25,381.7l-172.4-98.8V133.7l172.4,98.8V381.7z M199.65,220.9l-174.4-100l77.2-47.6
			l176.4,97.2L199.65,220.9z M378.45,272.5l-172.4,108.8V232.1l172.4-108.4V272.5z"/>
                        </g>
                    </g>
                </symbol>
            </svg>


            <section className='buy-sec'>
                <div>Summary cost: {buy.cost}$</div>
                <svg onClick={productsListClose} className='show-buys-svg'>
                    <use
                        xlinkHref={isHistoryOpen ? "#open-box" : "#close-box"}
                    />
                </svg>
            </section>
                <div className={classNames('buys-list-block',{'none-display-block': !isHistoryOpen})}>
                    {
                            buy.products.map(product => {
                                return (
                                    <div className='buying-block'>
                                        <img className='buying-img' src={noImageProduct}/>
                                        <div className='buying-info'>
                                            <span>Title:</span>
                                            <span>{product.title}</span>
                                            <span>Description:</span>
                                            <span>{product.description}</span>
                                            <span>Product cost:</span>
                                            <span>{product.cost}$</span>
                                            <span>Product count:</span>
                                            <span>{product.count}</span>
                                        </div>
                                    </div>
                                )
                            })
                    }
                </div>
        </>
    )
}