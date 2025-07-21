
import React from 'react';
import type { Order } from '../types';
import Button from './ui/Button';

interface OrderCardProps {
    order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
    return (
        <div className="bg-white rounded-xl border-2 border-neutral-darker p-4 flex flex-col justify-between transition-transform hover:-translate-y-1">
            <div>
                <p className="text-sm text-neutral-dark">ORDER ID</p>
                <p className="text-3xl font-bold text-neutral-darker my-1">{order.do_id}</p>
                <p className="text-lg font-medium text-neutral-darker mb-1 truncate" title={order.goods_name}>
                    {order.goods_name}
                </p>
                <p className="text-sm text-neutral-dark mb-4">
                    {order.origin_name} &rarr; {order.destination_name}
                </p>
            </div>
            <Button variant="secondary" size="sm" className="mt-4 w-full">
                Lihat Detail
            </Button>
        </div>
    );
};

export default OrderCard;
