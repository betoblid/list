

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../UI/Button";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../UI/Select"
import { useSearchParams } from "react-router-dom";


interface PaginationProps {
    pages: number,
    item: number,
    page: number
}

export default function Pagination({ item, page, pages }: PaginationProps) {

    const [,setSearchParams] = useSearchParams()

    //trocando o parametro da URL
    function FirstPage(){
        setSearchParams( (params ) => {
            params.set("page", "1")

            return params
        })
    }
     //trocando o parametro da URL e incrementando mais 1 page caso tiver mais pagina
     function NextParams(){

        if(page + 1 > pages){
            return
        }
        setSearchParams( (params ) => {
            params.set("page", String(page + 1))
            return params
        })
    }
     //trocando o parametro da URL decrementando a pagina para - 1
     function PreviousPage(){

        if(page - 1 <= 0){
            return;
        }
        setSearchParams( (params ) => {
            params.set("page", String( page - 1 ))
            return params
        })
    }

     //trocando o parametro da URL, ir para ultima pagina
     function LastPage(){
        setSearchParams( (params ) => {
            params.set("page", String(pages))
            return params
        })
    }

    return (
        <div className="flex items-center justify-between text-sm text-zinc-500">
            <span lang="en-us">Showing 10 of {item} items</span>
            <div className="flex items-center gap-8">
                <div className="flex items-center gap-2">
                    <span lang="en-us">Rows por Page</span>

                    <Select defaultValue="10">
                        <SelectTrigger aria-label="Page" />
                        <SelectContent>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="20">20</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <span>{page} de {pages}</span>

                <div className="space-x-1.5">
                    <Button onClick={FirstPage} size="icon" disabled={ page - 1 <= 0 }>
                        <ChevronLeft />
                        <span className="sr-only" lang="en-us">First Page</span>
                    </Button>
                    <Button onClick={PreviousPage} size="icon" disabled={ page - 1 <= 0 }>
                        <ChevronLeft />
                        <span className="sr-only" lang="en-us">Previous Page</span>
                    </Button>
                    <Button onClick={NextParams} size="icon" disabled={ page + 1 > pages }>
                        <ChevronRight />
                        <span className="sr-only" lang="en-us">Next Page</span>
                    </Button>
                    <Button onClick={LastPage} size="icon" disabled={ page + 1 > pages }>
                        <ChevronRight />
                        <span className="sr-only" lang="en-us">Last Page</span>
                    </Button>
                </div>
            </div>

        </div>
    );
}





