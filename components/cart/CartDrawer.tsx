"use client";

// components/cart/CartDrawer.tsx
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { on } from "events";
import {useRouter} from "next/navigation";

export default function CartDrawer({ open, onOpenChange, item }: any) {
    const router = useRouter();
    const handleCheckout = () => {
    
    onOpenChange(false);
    router.push("/payment");
  };
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-w-md ml-auto">
        <DrawerHeader>
          <DrawerTitle>Shopping Cart</DrawerTitle>
        </DrawerHeader>
        <div className="p-4 flex gap-4 items-start">
          {item && (
            <>
              <Image
                src={item.img}
                alt={item.name}
                width={80}
                height={100}
                className="object-cover"
              />
              <div className="text-sm">
                <p className="font-semibold">{item.name}</p>
                <p>Nu.{item.price}</p>
                <p>Qty: {item.qty}</p>
              </div>
            </>
          )}
        </div>
        <DrawerFooter>
          <Button className="w-full" onClick={handleCheckout}>
            Checkout
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => onOpenChange(false)}
          >
            Continue Shopping
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
