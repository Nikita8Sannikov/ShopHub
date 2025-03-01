// import { useSelector } from 'react-redux';
import SideLayout from '../sideLayout'
// import { RootState } from '@/store';
import { Input } from "@/components/ui/input"
// import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from "@/components/ui/button";
import { PopoverAvatar } from '../popoverAvatar';
import { AuthSheet } from '../authSheet';

const Header = () => {
    // const user = useSelector((state: RootState) => state.auth.user);
    return (
        <header className="p-5 text-center bg-black text-white rounded-b-xl shadow-xl">
            <SideLayout side="between">
                <div className="font-black">
                    $HO₽_HU₿
                </div>
                <div                >
                    <Input type="" placeholder="Я ищу.." />
                </div>
                <AuthSheet/>
                <div className='flex'>
                    <Button  onClick={()=> console.log('тык')}>Корзина</Button>
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