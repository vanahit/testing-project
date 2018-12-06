import React, { Fragment } from 'react';

const Pagination = ({load_More, loadMore, currentPage, prev, pageClick, next, pages}) => {
  return (
  	<Fragment>
	    {load_More + currentPage !== pages.length && <button className="viewMore" onClick={() => loadMore()}>Load More</button>}
			{pages.length>1 && <div className="pagination">
				<div className="paginationContent">
					{load_More + currentPage !== 1 && <span onClick={() => prev()}> Previous </span>}
					<div className="pages">
						<span>Pages:</span>
						<ul>
						{
							pages.map( page => {
								return (
									<li
										className={`${page === (currentPage+load_More) ? 'active' : ""}`} 
										key={page} 
										id={page}
										onClick={ e => pageClick(e)  }>
										{page}
									</li>
								)	
							} )
						}
						</ul>
					</div>
					{load_More + currentPage !== pages.length && <span onClick={() => next()}> Next </span>}
				</div>
			</div>}
		</Fragment>
  )
}

export default Pagination;