import React, { FC, Children, ReactNode, useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

import * as models from "models";

import * as styled from "./nftGrid.styles";
import { NftCard } from "./nftCard";

export interface INftGridprops {
  itemsPerPage: number;
  nftObjects: models.INftObject[];
}

export const NftGridComp: FC<INftGridprops> = ({
  itemsPerPage,
  nftObjects,
}) => {
  const [currentItems, setCurrentItems] = useState<models.INftObject[]>([]);
  const [pageCount, setPageCount] = useState(0);

  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(nftObjects.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(nftObjects.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, nftObjects]);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % nftObjects.length;
    setItemOffset(newOffset);
  };

  return (
    <styled.NftGrid>
      <div className="nft-items">
        {currentItems &&
          currentItems.map((data, idx) => <NftCard nftData={data} key={idx} />)}
      </div>
      <ReactPaginate
        breakLabel="skip"
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={4}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={() => null}
      />
    </styled.NftGrid>
  );
};
