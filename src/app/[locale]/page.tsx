import MainSlider from "./(components)/home/MainSlider";
import BtnModeToggle from "./(components)/navbar/BtnModeToggle";
import BtnLanguage from "./(components)/navbar/BtnLanguage";
import CategoriesSection from "./(components)/home/CategoriesSection";
import ProductsSection from "./(components)/home/ProductsSection";

export default function HomePage() {
  return (
    <div className="container mx-auto ">
      <BtnModeToggle />
      <BtnLanguage />
      <MainSlider />
      <CategoriesSection />
      <ProductsSection />
    </div>
  );
}
