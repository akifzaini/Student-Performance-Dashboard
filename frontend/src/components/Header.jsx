
function Header() {

  return (
    <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm px-6 py-3 flex justify-between items-center sticky top-0 z-50">

      <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
        Student Performance Dashboard
      </h2>

      <div className="flex items-center gap-5">

        <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full shadow">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Akif Zaini
          </span>
        </div>

      </div>
    </header>
  );
}

export default Header;
