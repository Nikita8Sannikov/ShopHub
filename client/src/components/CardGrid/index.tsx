import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { RootState } from '@/store';
import { Product } from '@/types/types';

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
    <div className="user-cards">
      {user?.isAdmin &&
        <div className='user-card' onClick={ callbacks.onCreate}>
          <img
            // src={product.image}
            alt={`+`}
            className="avatar"
          />
          <h2 className="name">
            Add new item
          </h2>

        </div>
      }
      {items.map((item: Product) => (
        <div
          key={item._id}
          className="user-card"
        >
          {renderItem(item)}
        </div>
      ))}
    </div>
  )
}

export default CardGrid