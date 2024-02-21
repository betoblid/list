

import { Badge, ChevronDown } from 'lucide-react'
import Logo from '../../assets/logo-nivo.svg'

export default function Header() {

    return (
        <header className="max-w-[1200px] mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2.5">
                    <img src={Logo} alt="logo nivo" />

                    <Badge>Beta</Badge>
                </div>
                <svg
                    width="6"
                    height="16"
                    viewBox="0 0 6 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <line
                        x1="1.18372"
                        y1="15.598"
                        x2="5.32483"
                        y2="0.143194"
                        className="stroke-zinc-700"
                    />
                </svg>
                <div className="flex items-center gap-2.5">
                    <img src="https://github.com/betoblid.png" alt="avatar do usuário" className='size-5 rounded-full' />

                    <span>betoblid</span>

                    <Badge>PRO</Badge>
                    <ChevronDown className='text-zinc-600 size-4' />
                </div>
                <svg
                    width="6"
                    height="16"
                    viewBox="0 0 6 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <line
                        x1="1.18372"
                        y1="15.598"
                        x2="5.32483"
                        y2="0.143194"
                        className="stroke-zinc-700"
                    />
                </svg>
                <div className="flex items-center gap-2.5">
                    <span className="text-sm font-medium text-zinc-800">Dash</span>
                    <ChevronDown className='size-4 text-zinc-600' />
                </div>
            </div>
            <div className="flex gap-3 items-center">
                <div className="flex flex-col items-end gap-0.5">
                    <span className="text-sm font-medium">Beto Souza</span>
                    <span className="text-xs text-zinc-400">beto@gmail.com</span>
                    <img src="https://github.com/diego3g.png" className='size-8 rounded-full' alt='foto'/>

                    <ChevronDown className='size-4 text-zinc-600'/>
                </div>
            </div>
        </header>
    )
}