import React from "react";

export default function Pagination({
                                     page,
                                     totalPages,
                                     onChange,
                                   }: {
  page: number;
  totalPages: number;
  onChange: (p: number) => void;
}) {
  if (totalPages <= 1) return null;
  const pages = [];
  for (let i = 1; i <= totalPages; i++) pages.push(i);
  return (
    <nav aria-label="Orders pagination">
      <ul className="pagination">
        <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => onChange(page - 1)} aria-label="Previous">Prev</button>
        </li>
        {pages.map((p) => (
          <li className={`page-item ${p === page ? "active" : ""}`} key={p}>
            <button className="page-link" onClick={() => onChange(p)}>{p}</button>
          </li>
        ))}
        <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => onChange(page + 1)} aria-label="Next">Next</button>
        </li>
      </ul>
    </nav>
  );
}
