import Header from "./components/Header.jsx";
import Carousel from "./components/Carousel.jsx";
import Collection from "./components/Collection.jsx";
import Story from "./components/Story.jsx";
import Reviews from "./components/Reviews.jsx";
import Footer from "./components/Footer.jsx";
import MenuPage from "./components/MenuPage.jsx";
import AdminPage from "./components/AdminPage.jsx";

export default function App() {
  const basePath = import.meta.env.BASE_URL;
  const pathname = (
    window.location.pathname.startsWith(basePath)
      ? `/${window.location.pathname.slice(basePath.length)}`
      : window.location.pathname
  ).replace(/\/+$/, "") || "/";

  if (pathname === "/admin") {
    return <AdminPage />;
  }

  if (pathname === "/menu") {
    return <MenuPage />;
  }

  return (
    <>
      <Header />
      <main>
        <Carousel />
        <Collection />
        <Story />
        <Reviews />
      </main>
      <Footer />
    </>
  );
}
