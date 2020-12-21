import React, {useState,useEffect} from "react";
import classNames from "classnames";


export const ChangePageNumber = (props) => {

    const {currentPageSet, currentPage, pagesCount} = props;
    let i = 0;

    useEffect(()=>{
        createPagesList(currentPage);
    },[pagesCount])

    const createPagesList = (currentPage) => {
        let pageNumbersNew=[];
        if (pagesCount > 3) {
            pageNumbersNew = [1, 2, 3];
            const statePageNumbers = [currentPage, pagesCount];
            statePageNumbers.forEach(page => {
                if (!pageNumbersNew.includes(page) && page > 0) {
                    if (page > pageNumbersNew[pageNumbersNew.length - 1] + 1) {
                        pageNumbersNew.push('...');
                    }
                    pageNumbersNew.push(page);
                }
            })
        } else {
            for(let i=1; i<pagesCount+1; i++){
                pageNumbersNew.push(i);
            }
        }
        return pageNumbersNew;
    }

    const [pageNumbers = createPagesList(), pageNumbersSet] = useState();

    const goToNextPage = () => {
        if (currentPage + 1 > pagesCount) {
            return;
        }
        currentPageSet(currentPage + 1);
        pageNumbersSet(createPagesList(currentPage + 1));
    }

    const goToPrevPage = () => {
        if (currentPage - 1 < 1) {
            return;
        }
        currentPageSet(currentPage - 1);
        pageNumbersSet(createPagesList(currentPage - 1));
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
                            i++;
                            return (<span key={page + i}>{page}</span>)
                        }
                        return (<button
                            key={page}
                            className={classNames('page-block-btn', {
                                'is-current': page === currentPage
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

export default ChangePageNumber;