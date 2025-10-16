import React from "react";

export default function SearchBar({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div className="input-group">
      <input aria-label="Search" value={value} onChange={(e) => onChange(e.target.value)} className="form-control form-control-sm" placeholder={placeholder ?? "Search orders / product id..."} />
      <button className="btn btn-sm btn-outline-secondary" onClick={() => onChange("")}>Clear</button>
    </div>
  );
}
