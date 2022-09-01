import Navbar from "../components/Header";

const SiteLayout = ({ children }) => {
  return (
    <section>
      <Navbar />
      <main className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="py-4">
          {children}
        </div>
      </main>
    </section>
  );
};

export default SiteLayout;
