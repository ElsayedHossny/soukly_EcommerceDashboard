export default async function getProductsRoute() {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products`);
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

export async function getSpecificProductRoute(id: string) {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`,
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

export async function getProductsDummy() {
  try {
    const res = await fetch("https://dummyjson.com/products");
    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }
    const data = await res.json();
    return data.products;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getSpecificProductsDummy(id: string) {
  try {
    const res = await fetch(`https://dummyjson.com/products/${id}`);
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
