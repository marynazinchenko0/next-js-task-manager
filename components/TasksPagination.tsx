"use client"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

type Props = {
  tasksTotal: number,
  pageSize: number,
  currentPage: number
}

const TasksPagination: React.FC<Props> = ({tasksTotal, pageSize, currentPage}) => {
  const pagesCount = Math.ceil(tasksTotal / pageSize)
  return (
    <Pagination className="ml-auto mr-0 w-fit">
      <PaginationContent>
        <PaginationItem className={currentPage <= 1 ? 'pointer-events-none' : ''}>
          <PaginationPrevious href={`tasks?page=${currentPage - 1}`}/>
        </PaginationItem>
        {
          [...Array(pagesCount)].map((_, i) =>
            <PaginationItem key={`pagination-item-${i}`}>
              <PaginationLink isActive={currentPage === i + 1} href={`tasks?page=${i + 1}`}>{i + 1}</PaginationLink>
            </PaginationItem>
          )
        }
        <PaginationItem className={currentPage === pagesCount ? 'pointer-events-none' : ''}>
          <PaginationNext href={`tasks?page=${currentPage + 1}`}/>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default TasksPagination
