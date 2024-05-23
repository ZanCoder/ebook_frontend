import React from "react";

interface PaginationInterface {
    thisPage: number;
    totalPage: number;
    pagination: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationInterface> = (props) => {
    const { thisPage, totalPage, pagination } = props;

    const renderPagination = () => {
        const listPage = [];

        // Tạo danh sách các trang
        for (let i = 1; i <= totalPage; i++) {
            listPage.push(i);
        }

        return (
            <ul className="pagination">
                <li className={`page-item ${thisPage === 1 ? 'disabled' : ''}`}>
                    <a className="page-link" onClick={() => pagination(1)}>First</a>
                </li>
                <li className={`page-item ${thisPage === 1 ? 'disabled' : ''}`}>
                    <a className="page-link" onClick={() => pagination(thisPage - 1)}>Previous</a>
                </li>
                {listPage.map(page => (
                    <li key={page} className={`page-item ${page === thisPage ? 'active' : ''}`}>
                        <a className="page-link" onClick={() => pagination(page)}>{page}</a>
                    </li>
                ))}
                <li className={`page-item ${thisPage === totalPage ? 'disabled' : ''}`}>
                    <a className="page-link" onClick={() => pagination(thisPage + 1)}>Next</a>
                </li>
                <li className={`page-item ${thisPage === totalPage ? 'disabled' : ''}`}>
                    <a className="page-link" onClick={() => pagination(totalPage)}>Last</a>
                </li>
            </ul>
        );
    };

    return (
        <nav aria-label="...">
            {renderPagination()}
        </nav>
    );
}

export default Pagination;