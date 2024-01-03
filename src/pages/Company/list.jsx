import React from "react";
import { useEffect, useState } from "react";
import { getCompanys } from "src/lib/company";
import Header from "src/components/common/Header";
import CompanyItem from "src/pages/Company/components/item";
import { Link } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "../../components/ui/command"


export default function CompanyList() {
  const [companys, setCompanys] = useState([]);
  const [load, setLoad] = useState(true);
  const [error, setError] = useState(false);
  const [maxPage, setMaxPage] = useState(0);
  const [pageId, setPageId] = useState(0);
  const [searchKey, setSerchKey] = useState("");

  useEffect(() => {
    async function wait() {
      try {
        console.log(searchKey);
        const companys = await getCompanys(pageId, searchKey);
        setMaxPage(companys.totalPages);
        setCompanys(companys.content);
        setLoad(true);
      } catch {
        setError(true);
      } finally {
        setLoad(false);
      }
    }
    wait();
  }, [pageId, searchKey]);

  if (load) {
    return "조회중";
  }

  if (error) {
    return "에런데용?";
  }

  const SearchCheck = (e) => {
    setSerchKey(e.target.value);
  }
  
	return (
    <div>
      <div>
        <Header />
      </div>
      <div className="max-w-3xl mx-auto">
        <Command>
          <CommandInput placeholder="search..." onChange={SearchCheck}/>
        </Command>
      </div>
      <div className="max-w-3xl mx-auto mt-7">
        {companys.map(({
          id,
          name,
          postalCode,
          address,
          industryCode,
          industry,
          registrationNumber,
          viewCount
        }) => (
          <Link to={`/companies/${id}`}>
            <CompanyItem 
              id={id} 
              name={name} 
              postalCode={postalCode} 
              address={address} 
              industryCode={industryCode} 
              industry={industry} 
              registrationNumber={registrationNumber} 
              viewCount={viewCount}
            />
          </Link>
        ))}
      </div>
      <Pagination>
        <PaginationContent>
          {pageId === 0 ? (
            <>
              <PaginationItem>
                <PaginationLink onClick={() => {setPageId(pageId)}}>{pageId + 1}</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink onClick={() => {setPageId(pageId + 1)}}>{pageId + 2}</PaginationLink>
              </PaginationItem>
              { 
                pageId + 1 < maxPage && (
                  <PaginationItem>
                    <PaginationLink onClick={() => {setPageId(pageId + 2)}}>{pageId + 3}</PaginationLink>
                  </PaginationItem>
                )
              }
              </>
            ) : <>
        {
          pageId > 0 && 
            <>
            <PaginationItem>
              <PaginationPrevious onClick={() => {setPageId(pageId - 1)}} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={() => {setPageId(pageId - 1)}}>{pageId}</PaginationLink>
            </PaginationItem>
          </>
      }
      <PaginationItem>
        <PaginationLink onClick={() => {setPageId(pageId)}}>{pageId + 1}</PaginationLink>
      </PaginationItem>
      {
        pageId + 1 < maxPage && (
          <PaginationItem>
            <PaginationLink onClick={() => {setPageId(pageId + 1)}}>{pageId + 2}</PaginationLink>
          </PaginationItem>
        )
      }
        </>}
          <PaginationItem>
            <PaginationNext onClick={() => {setPageId(pageId + 1)}} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
