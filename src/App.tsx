import { FileDown, Filter, Loader2, MoreHorizontal, Plus, Search } from 'lucide-react'
import * as dialog from "@radix-ui/react-dialog"
import Header from './Components/Header'
import Tabs from './Components/Tabs'
import { Button } from './Components/UI/Button'
import { Control, Input } from './Components/UI/Input'
import { FormEvent, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CreateTagForm } from './Components/Form/create-tag-form'
import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query'
import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from './Components/UI/Table'
import Pagination from './Components/Pagination'

export interface TagResponse {
  first: number
  prev: number | null
  next: number
  last: number
  pages: number
  items: number
  data: Tag[]
}

export interface Tag {
  title: string
  slug: string
  amountOfVideos: number
  id: string
}



function App() {
  const [searchParams, setSearchParams] = useSearchParams() // armazenando Hook da url
  const urlFilters = searchParams.get("filter") ?? "" //Pegando dados da url
  const [filterText, setFilterText] = useState<string>(urlFilters)

  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1

  const { data: TagsResponse, isLoading, isFetching, isSuccess } = useQuery<TagResponse>({
    queryKey: ['get-tags', urlFilters, page],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3333/tags?_page=${page}&_per_page=10&title=${urlFilters}`)
      const data = res.json()

      return data
    },
    placeholderData: keepPreviousData,

  })

  function HandleFilter(event: FormEvent) {
    event.preventDefault();
    setFilterText("")
    setSearchParams((params) => {
      params.set("page", "1")
      params.set("filter", filterText)

      return params

      
    })

  }
  if (isLoading) {
    return null
  }



  return (
    <div className="py-10 space-y-8">
      <div>
        <Header />
        <Tabs />
      </div>
      <main className='max-w-6xl mx-auto space-y-5'>
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold">Tags</h1>
          <dialog.Root>
            <dialog.Trigger asChild>
              <Button variant='primary'>
                <Plus className='size-3' />
                Create new
              </Button>
            </dialog.Trigger>

            <dialog.Portal>
              <dialog.Overlay className='fixed inset-0 bg-black/70' />
              <dialog.Content className='fixed space-y-10 p-10 right-0 top-0 bottom-0 h-screen min-w-[320px] z-10 bg-zinc-950 border-1 border-zinc-900'>

                <div className="space-y-3">
                  <dialog.Title className='text-xl font-bold' lang='en-us'>
                    Create tag
                  </dialog.Title>
                  <dialog.Description className='text-sm text-zinc-500' lang='en-us'>
                    tags can be used to group videos about similar comcepts
                  </dialog.Description>
                </div>

                <CreateTagForm />
              </dialog.Content>
            </dialog.Portal>
          </dialog.Root>
          {isFetching && <Loader2 className="size-4 animate-spin text-zinc-500" />}
        </div>
        <div className="flex items-center justify-between">
          <form action="" className='flex items-center gap-2' onSubmit={HandleFilter}>
            <Input variant='filter'>
              <Search className='size-3' />
              <Control
                placeholder='Pesquisar Tag'
                onChange={(event) => setFilterText(event.target.value)}
                value={filterText}
              />
            </Input>

            <Button type='submit' lang='en-us'>
              <Filter className='size-3' />
              Apply filters
            </Button>
          </form>
          <Button>
            <FileDown className='size-3' />
            Export
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Tag</TableHead>
              <TableHead>Amount of videos</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {TagsResponse.data.map((tag) => {
              return (
                <TableRow key={tag.id}>
                  <TableCell></TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-medium">{tag.title}</span>
                      <span className="text-xs text-zinc-500">{tag.slug}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-zinc-300">
                    {tag.amountOfVideos} video(s)
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="icon">
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        {TagsResponse && <Pagination pages={TagsResponse?.pages} item={TagsResponse?.items} page={page} />}
      </main>
    </div>

  )
}

export default App
