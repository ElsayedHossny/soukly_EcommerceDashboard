import MainSlider from "./(components)/home/MainSlider";
import CategoriesSection from "./(components)/home/CategoriesSection";
import ProductsSection from "./(components)/home/ProductsSection";
export default function HomePage() {
  return (
    <>
      <div className="container mx-auto ">
        <MainSlider />
        <CategoriesSection />
        <ProductsSection />
      </div>
    </>
  );
}
