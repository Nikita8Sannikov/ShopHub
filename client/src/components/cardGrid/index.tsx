import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { RootState } from '@/store';
import { Product } from '@/types/types';
import { Card, CardContent } from '../ui/card';
interface CardGridProps {
  items: Product[];
  renderItem: (item: Product) => React.ReactNode;
}

const CardGrid = ({ items, renderItem }: CardGridProps) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  const callbacks = {
    onCreate: () => {
      navigate("/create");
    },
  }
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] auto-rows-[1fr] gap-5 p-5 w-[120%]">
      {user?.isAdmin && (
        <Card onClick={callbacks.onCreate}  className="flex items-center justify-center p-4 cursor-pointer transition-transform duration-200 hover:scale-105 border-dashed border-gray-400">
          <CardContent className="p-0 flex flex-col items-center justify-center">
            <div className="w-[100px] h-[100px] rounded-full bg-gray-200 flex items-center justify-center text-4xl font-bold text-gray-600">
              +
            </div>
            <h2 className="mt-3 text-lg text-gray-800">Add new item</h2>
          </CardContent>
        </Card>

      )}
      {items.map((item: Product) => (
        <Card key={item._id} className="h-full flex flex-col transition-transform duration-200 hover:scale-105 border-gray-400">
          <CardContent className="flex-1 flex flex-col p-2">{renderItem(item)}</CardContent>
        </Card>
      ))}
    </div>
  )
}

export default CardGrid