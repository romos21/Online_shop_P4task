import React, {useState} from "react";
import classNames from "classnames";

export const ChangePageNumber=(props)=>{

    const {currentPageSet,currentPage,pagesCount}=props;

    const createPagesList = () => {
        const pageNumbersNew = [];
        for (let i = 1; i < pagesCount+1; i++) {
            if (i < 4) {
                pageNumbersNew.push(i);
            }
            if (currentPage > 3 && currentPage < pagesCount) {
                if (currentPage > 4) {
                    pageNumbersNew.push('...');
                }
                pageNumbersNew.push(currentPage);
                if (currentPage + 1 < pagesCount) {
                    pageNumbersNew.push('...');
                }
            }
            if (i === 3 && pagesCount > 3) {
                pageNumbersNew.push(pagesCount)
            }
        }
        return pageNumbersNew;
    }

    const [pageNumbers=createPagesList(),pageNumbersSet]=useState();

    const goToNextPage = () => {
        if (currentPage + 1 > pagesCount) {
            return;
        }
        currentPageSet(currentPage + 1);
        pageNumbersSet(createPagesList());
    }

    const goToPrevPage = () => {
        if (currentPage - 1 < 1) {
            return;
        }
        currentPageSet(currentPage - 1);
        pageNumbersSet(createPagesList());
    }

    const goToPage = (event) => {
        currentPageSet(Number(event.target.textContent));
        pageNumbersSet(createPagesList());
    }

    return (
        <div className='change-page-block'>
            <button onClick={goToPrevPage} className='change-page-btn'>Previous</button>
            <div className='page-block'>
                {
                    pageNumbers.map(page => {
                        if (page === '...') {
                            return (<span key={page}>{page}</span>)
                        }
                        return (<button
                            key={page}
                            className={classNames('page-block-btn',{
                                'is-current': page===currentPage
                            })}
                            onClick={goToPage}
                        >{page}
                        </button>)
                    })
                }
            </div>
            <button onClick={goToNextPage} className='change-page-btn'>Next</button>
        </div>
    );
}