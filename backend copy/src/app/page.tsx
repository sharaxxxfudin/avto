import Image from "next/image";
import Hero from "./components/section/hero/hero";
import About from "./components/section/about/about";
import Advantages from "./components/section/advantages/advantages";
import Catalog from "./components/section/catalog/catalog";
import Steps from "./components/section/step/step";
import TopBar from "./components/layot/topbar/topbar";

export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <Advantages />
      <Catalog />
      <Steps />
    </div>
  );
}
