import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

//criando o componente Table para agrupar os demais
interface TableProps extends ComponentProps<'table'> {}

export function Table(props: TableProps){
    return <table {...props} className={twMerge('w-full text-sm border-t-2 border-b-2 border-zinc-800', props.className)}/>
}

//criado um componente head da tabela
interface TheaderProps extends ComponentProps<'thead'>{}
export function TableHeader(props: TheaderProps) {

    return <thead {...props}/>
}

//criado um componente BODY da tabela
interface TbodyProps extends ComponentProps<'tbody'>{}
export function TableBody(props: TbodyProps) {

    return <tbody {...props} className={twMerge( '[&_tr:last-child]:border-0 [&_tr:hover]:bg-zinc-800/50', props.className)}/>
}

// criado um componente tr da tabela
interface TableRow extends ComponentProps<'tr'> {}
export function TableRow(props: TableRow){
    return <tr {...props} className={twMerge( "border-b border-zinc-800", props.className)}/>
}

// criado um componente th da tabela
interface TheadProps extends ComponentProps<'th'> {}
export function TableHead(props: TheadProps){

    return <th {...props} className={twMerge( 'text-left py-3 px-4 font-medium text-zinc-300', props.className)}/>
}

//criado um componente de td
interface TableCell extends ComponentProps<'td'> {}

export function TableCell(props: TableCell){

    return <td {...props} className={twMerge( "py-2 my-2", props.className )}/>
}