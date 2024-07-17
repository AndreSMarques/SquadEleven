import Header from "./Header";

export default function App() {
  return (
    <>
      <Header />
      <div className="bg-blue-500 text-white p-4 rounded-md shadow-md">
        This is a Tailwind CSS styled div
      </div>
      <button className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md mt-4">
        Click me
      </button>
    </>
  );
}