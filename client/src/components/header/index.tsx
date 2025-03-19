import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { RootState } from '@/store';

import { Input } from "@/components/ui/input"
import { PopoverAvatar } from '../popoverAvatar';
import { AuthSheet } from '../authSheet';
import { Button } from '../ui/button';
import SideLayout from '../sideLayout'
import BasketTool from '../basketTool';


interface HeaderProps {
    search?: string
    setSearch?: (e: string) => void
    onBack?: () => void
    showBack?: boolean
}

const Header = ({ search, setSearch, onBack, showBack = false }: HeaderProps) => {
    const { id } = useParams();
    const isAuth = useSelector((state: RootState) => state.auth.exists);

    return (
        <header className="p-5 text-center bg-black text-white rounded-b-xl shadow-xl fixed top-0 left-0 right-0 z-50">
            <SideLayout side="between">
                <div className='flex space-x-2 flex-col'>
                <div className="font-black">
                    $HO₽_HU₿
                </div>
                {/* {id &&  */}
                {showBack &&
                <Button onClick={onBack}>Назад</Button>
                }
                {/* } */}
                {/* onClick={()=>window.history.back()} variant="secondary" */}
                </div>
                {!id &&
                    <div>
                        <Input type="text"
                            placeholder="Я ищу.."
                            value={search}
                            onChange={(e) => setSearch?.(e.target.value)}
                        // className="w-80"
                        />
                    </div>
                }

                {!isAuth && <AuthSheet />}
                <div className='flex'>
                    <BasketTool />
                    <PopoverAvatar />
                </div>

            </SideLayout>
            <div className="flex flex-col">
                <h1 >Consume, Obey, Buy</h1>
                <h2>Here</h2>
            </div>
        </header>
    )
}

export default Header