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
import { useRouter } from "next/navigation";

export default function CartDrawer({
  open,
  onOpenChange,
  items,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: any[];
}) {
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
        <div className="p-4 space-y-4 max-h-[400px] overflow-y-auto">
          {items.length === 0 ? (
            <p className="text-center text-sm text-gray-500">
              Your cart is empty
            </p>
          ) : (
            items.map((item, index) => (
              <div key={index} className="flex gap-4 items-start border-b pb-4">
                <Image
                  src={item.image || "/placeholder.png"}
                  alt={item.name}
                  width={80}
                  height={100}
                  className="object-cover"
                />
                <div className="text-sm">
                  <p className="font-semibold">{item.name}</p>
                  <p>Nu.{item.price}</p>
                  <p>Qty: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                  <p>Color: {item.color}</p>
                </div>
              </div>
            ))
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
