import MainSlider from "./(components)/home/MainSlider";
import BtnModeToggle from "./(components)/navbar/BtnModeToggle";
import BtnLanguage from "./(components)/navbar/BtnLanguage";
import CategoriesSection from "./(components)/home/CategoriesSection";

export default function HomePage() {
  return (
    <div className="container mx-auto ">
      <BtnModeToggle />
      <BtnLanguage />
      <MainSlider />
      <CategoriesSection />
    </div>
  );
}
