import React from "react";
import { useEffect, useState } from "react";
import { getCompanys } from "src/lib/company";
import Header from "src/components/common/Header";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination";
import { Command, CommandInput } from "../../components/ui/command";
import Items from "src/components/company/items";

export default function CompanyList() {
  const [companys, setCompanys] = useState([]);
  const [error, setError] = useState(false);
  const [maxPage, setMaxPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [pageId, setPageId] = useState(0);
  const [query, setQuery] = useState("");

  const SearchCheck = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    async function wait() {
      try {
        const companys = await getCompanys(pageId, query);
        setMaxPage(companys.totalPages);
        setTotalCount(companys.totalElements);
        setCompanys(companys.content);
      } catch {
        setError(true);
      }
    }
    wait();
  }, [pageId, query]);

  if (error) {
    return "에런데용?";
  }

  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="max-w-3xl mx-auto">
        <Command>
          <CommandInput
            placeholder="회사명을 입력해주세요."
            value={query}
            onChange={SearchCheck}
          />
        </Command>
      </div>
      <div className="max-w-3xl mx-auto mt-7 px-4">
        <div className="mb-2">
          총 개수 : {new Intl.NumberFormat().format(totalCount)}
        </div>
        <Items companys={companys} />
      </div>
      <Pagination>
        <PaginationContent>
          {pageId === 0 ? (
            <>
              <PaginationItem>
                <PaginationLink
                  onClick={() => {
                    setPageId(pageId);
                  }}
                >
                  {pageId + 1}
                </PaginationLink>
              </PaginationItem>
              {pageId !== 1 && (
                <PaginationItem>
                  <PaginationLink
                    onClick={() => {
                      setPageId(pageId + 1);
                    }}
                  >
                    {pageId + 2}
                  </PaginationLink>
                </PaginationItem>
              )}
              {pageId + 1 < maxPage && (
                <PaginationItem>
                  <PaginationLink
                    onClick={() => {
                      setPageId(pageId + 2);
                    }}
                  >
                    {pageId + 3}
                  </PaginationLink>
                </PaginationItem>
              )}
            </>
          ) : (
            <>
              {pageId > 0 && (
                <>
                  {pageId > 0 && (
                    <>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() => {
                            setPageId(pageId - 1);
                          }}
                        />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          onClick={() => {
                            setPageId(pageId - 1);
                          }}
                        >
                          {pageId}
                        </PaginationLink>
                      </PaginationItem>
                    </>
                  )}
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => {
                        setPageId(pageId);
                      }}
                    >
                      {pageId + 1}
                    </PaginationLink>
                  </PaginationItem>
                  {pageId + 1 < maxPage && (
                    <PaginationItem>
                      <PaginationLink
                        onClick={() => {
                          setPageId(pageId + 1);
                        }}
                      >
                        {pageId + 2}
                      </PaginationLink>
                    </PaginationItem>
                  )}
                </>
              )}
            </>
          )}
          <PaginationItem>
            <PaginationNext
              onClick={() => {
                setPageId(pageId + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
