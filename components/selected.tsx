import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function ProductPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Button variant="outline" className="mb-4">Back</Button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="w-full h-auto">
          <Image
            src="/sonam-poncho.jpg"
            alt="Sonam Poncho"
            width={600}
            height={800}
            className="object-cover w-full"
          />
        </div>
        <div>
          <h1 className="text-3xl font-semibold mb-2">Sonam Poncho</h1>
          <p className="text-gray-700 mb-1">Nu.14000</p>
          <p className="text-gray-600 mb-4 text-sm">
            One of the best textiles woven by Bhutanese Artisan. With natural colors and threads. Each design crafted in the clothes symbolizes a great sense of hardwork and Bhutanese cultures.
          </p>

          <div className="mb-4">
            <p className="mb-1 font-medium">Sizes</p>
            <div className="flex gap-2 mb-2">
              {['M', 'L', 'XL'].map(size => (
                <Button variant="outline" size="sm" key={size}>{size}</Button>
              ))}
            </div>
            <div className="flex gap-2 mb-4">
              <div className="w-5 h-5 rounded-full bg-rose-500 cursor-pointer"></div>
              <div className="w-5 h-5 rounded-full bg-cyan-400 cursor-pointer"></div>
              <div className="w-5 h-5 rounded-full bg-purple-400 cursor-pointer"></div>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <Button size="icon">-</Button>
              <span>1</span>
              <Button size="icon">+</Button>
            </div>

            <Button className="bg-black text-white">Add to Cart</Button>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mt-16 mb-4">Related Items</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[
          { name: 'Sonam Poncho', img: '/sonam-poncho.jpg' },
          { name: 'Yatra Hooded Jacket', img: '/yatra-hooded-jacket.jpg' },
          { name: 'Tunic Dress', img: '/tunic-dress.jpg' }
        ].map((item, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-0">
              <Image
                src={item.img}
                alt={item.name}
                width={400}
                height={500}
                className="object-cover w-full"
              />
              <div className="p-2 text-center text-sm font-medium">{item.name}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
