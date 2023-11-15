import {Pagination} from "react-bootstrap";
import {useMemo} from "react";
import {memo} from "react";
import { PAGINATION } from "../helpers/constants";
const CustomPagination = function (
    {
        page,
        pages,
        onPageChange
    }
)
{
    const items = useMemo(
        () => {
            let result = [];

            if (!pages) {
                return [];
            }

            if (pages <= PAGINATION.maxPagesShowAll) {

                for (let pageNumber = 1; pageNumber <= pages; pageNumber++) {
                    result.push(
                        <Pagination.Item key={pageNumber} active={pageNumber === page} onClick={() => onPageChange(pageNumber)}>
                            {pageNumber}
                        </Pagination.Item>,
                    );
                }

                return result;
            }

            for (let pageNumber = 1; pageNumber <= pages; pageNumber++) {
                if (pageNumber < PAGINATION.ellipsisPostion || pageNumber > pages -  PAGINATION.ellipsisPostion) {
                    result.push(
                        <Pagination.Item key={pageNumber} active={pageNumber === page} onClick={() => onPageChange(pageNumber)}>
                            {pageNumber}
                        </Pagination.Item>
                    );
                    continue;
                }

                if (pageNumber === PAGINATION.ellipsisPostion) {
                    result.push(
                        <Pagination.Ellipsis />
                    )
                }
            }

            return result;
        },
        [pages, page]
    )

    return (
        <Pagination>
            <Pagination.First onClick={() => onPageChange(1)}/>
            <Pagination.Prev onClick={() => onPageChange(page - 1)} />
            { items }
            <Pagination.Next onClick={() => onPageChange(page + 1)}/>
            <Pagination.Last onClick={() => onPageChange(pages)} />
        </Pagination>
    )
}

export default memo(CustomPagination);