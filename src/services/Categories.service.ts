export async function getCategoriesRoute() {
  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/categories",
    );
    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
export async function getCategoriesDummy() {
  try {
    const res = await fetch("https://dummyjson.com/products/category-list");
    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
