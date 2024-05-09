import { db } from "../_lib/prisma";
import CategoryItem from "./category-item";

const CategoryList = async () => {
  // pegar as categorias do banco de dados
  const categories = await db.category.findMany({});
  // renderizar um item para cada categoria
  return (
    // <div className="flex overflow-x-scroll">
    <div className="grid grid-cols-2 gap-3">
      {categories.map((category, index) => (
        // <h1 key={index}>{category.name}</h1>
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default CategoryList;
