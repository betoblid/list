import * as dialog from '@radix-ui/react-dialog'
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../UI/Button'
import { Check, Loader2, X } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { json } from 'react-router-dom'


const userFormSchame = z.object({
    tagName: z.string().min(3 , "Digite 3 caractes para tags")
})

type userFormType = z.infer<typeof userFormSchame>


function getSlugFromString(input: string): string {
    return input
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, '-');
}


export function CreateTagForm() {

    const QueryClient = useQueryClient()

    const { handleSubmit, watch, formState: { errors, isSubmitting }, register } = useForm<userFormType>({
        resolver: zodResolver(userFormSchame)
    })

    const TextSlug = watch('tagName') ? getSlugFromString(watch("tagName")) : '';

    const { mutateAsync } = useMutation({
        mutationFn: async ({ tagName }: userFormType) => {
            await fetch("http://localhost:3333/tags", {
                method: "POST",
                body: JSON.stringify({
                    tagName,
                    TextSlug,
                    amountOfVideos: 0
                })
            })
            onSuccess: () => {
                QueryClient.invalidateQueries({
                    queryKey: ['get-tags']
                })
            }
        }
    })

    async function CreateTag({tagName}: userFormType) {
        await mutateAsync({tagName})
    }

    return (
        <form action="" onSubmit={handleSubmit(CreateTag)}>

            <div className="space-y-2">
                <label htmlFor="tagName" className="text-sm font-medium block">Tag Name</label>
                <input
                    type="text"
                    {...register("tagName")}
                    className="border border-zinc-800 rounded-lg px-3 py-2.5 bg-zinc-800/50 w-full text-sm"
                />
                <p className="text-sm text-red-400"></p>
            </div>

            <div className="space-y-2">
                <label htmlFor="tagName" className="text-sm font-medium block">Slug</label>
                <input
                    type="text"
                    readOnly
                    value={TextSlug}
                    className="border border-zinc-800 rounded-lg px-3 py-2 bg-zinc-800/50 w-full text-sm"
                />
                <p className="text-sm text-red-400"></p>
            </div>

            <div className="flex items-center justify-end gap-2">
                <dialog.Close>
                    <Button>
                        <X className='size-3' />
                    </Button>
                </dialog.Close>

                <Button disabled={isSubmitting} className='bg-teal-400 text-teal-950' type='submit'>
                    {isSubmitting ? <Loader2 className="size-3 animate-spin" /> : <Check className="size-3" />}
                    Save
                </Button>
            </div>
        </form>
    )
}




