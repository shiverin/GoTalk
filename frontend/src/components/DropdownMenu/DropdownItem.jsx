export function DropdownItem({ children, onClick, danger = false, icon }) {
  return (
    <div
      onClick={onClick}
      className={`pl-6 pr-10 py-3 text-base cursor-pointer select-none flex items-center gap-4
        ${danger ? "text-red-600 hover:bg-red-50" : "text-gray-700 hover:bg-gray-100"}
      `}
    >
      {icon && <span className="w-4 h-4 flex-shrink-0">{icon}</span>}
      <span className="flex-1">{children}</span>
    </div>
  );
}