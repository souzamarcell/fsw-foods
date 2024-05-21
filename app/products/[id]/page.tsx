import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import ProductImage from "./_components/product-image";
import ProductDetails from "./_components/product-details";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  // const [quantity, setQuantity] = useState(1);

  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
    },
  });

  if (!product) {
    return notFound();
  }

  const juices = await db.product.findMany({
    where: {
      category: {
        name: "Sucos",
      },
      restaurant: {
        id: product?.restaurant.id, // sucos do mesmo restaurante. 
      },
    },
    include: {
      restaurant: true,
    },
  });

  // return <div>product page {id}</div>;
  return (
    <div>
      {/* IMAGEM */}
      <ProductImage product={product} />

      {/* TITULO E PREÇO */}
      <ProductDetails product={product} complementaryProducts={juices} />
    </div>
  );
};

export default ProductPage;
