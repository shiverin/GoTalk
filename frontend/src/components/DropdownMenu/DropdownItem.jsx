export function DropdownItem({ children, onClick, danger = false }) {
  return (
    <div
      onClick={onClick}
      className={`px-4 py-2 text-sm cursor-pointer select-none
        ${danger ? "text-red-600 hover:bg-red-50" : "text-gray-700 hover:bg-gray-100"}
      `}
    >
      {children}
    </div>
  );
}
