"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";  // import router

type CartItemProps = {
  item: {
    id: number;
    cartId: number;
    name: string;
    price: number;
    description: string;
    image: string;
    size: string;
  };
  highlight?: boolean;
  onDelete: (cartId: number) => void;
};

const CartItem = ({ item, highlight, onDelete }: CartItemProps) => {
  const router = useRouter(); // initialize router

  const handlePayClick = () => {
    // Navigate to payment page
    router.push("/payment");  // change this path if your payment page is somewhere else
  };

  return (
    <div
      className={cn(
        "flex items-center border rounded-md p-4 gap-4",
        highlight && "border-purple-500"
      )}
    >
      <Image
        src={item.image}
        alt={item.name}
        width={80}
        height={80}
        className="object-cover rounded-md"
      />
      <div className="flex-1">
        <div className="font-semibold">{item.name}</div>
        <div className="text-sm text-gray-500">Nu.{item.price}</div>
        <p className="text-sm mt-1 text-gray-600">{item.description}</p>
      </div>
      <div className="text-center w-12 font-medium text-gray-700">{item.size}</div>
      <Button variant="outline" size="sm" onClick={() => onDelete(item.cartId)}>
        Delete
      </Button>
      <Button variant="outline" size="sm" onClick={handlePayClick}>
        Pay
      </Button>
    </div>
  );
};

export default CartItem;
