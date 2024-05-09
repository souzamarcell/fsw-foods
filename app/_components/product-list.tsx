import { db } from "../_lib/prisma";
import ProductItem from "./product-item";

const ProductList = async () => {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 20,
    include: {
      // restaurant: true,
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });

  // console.log(products)

  return (
    <div className="flex gap-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
      {/* 
        {products.map((i, index) => (
        <h1 key={index}>{i.name}</h1>
      ))} 
      */}
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
