import Link from "next/link";

export default function Breadcrumb({ items = [] }) {
  return (
    <div className="bg-gray-100 w-full py-3 text-sm text-gray-600">
      <div className="Container ">
        <nav className="flex flex-wrap gap-1 items-center">
          {items.map((item, index) => (
            <span key={index} className="flex items-center">
              {index > 0 && <span className="mx-1">/</span>}
              {item.href ? (
                <Link
                  href={item.href}
                  className="text-blue-700 hover:underline"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-[var(--darkGray4)]">{item.label}</span>
              )}
            </span>
          ))}
        </nav>
      </div>
    </div>
  );
}
