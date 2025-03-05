import { Product } from '@/types/types';
import React from 'react'

interface CardGridProps {
    items: Product[];
    renderItem: (item: Product) => React.ReactNode;
}

const CardGrid = ({ items, renderItem }: CardGridProps) => {

  return (
    <div className="user-cards">
    { items.map((item: Product) => (
         <div
         key={item.id}
         className="user-card"
     >
        { renderItem(item) }
        </div>
     ))}
</div>
  )
}

export default CardGrid