// src/components/Button.jsx
export default function Button({ variant = "primary", className = "", ...props }) {
  const base = "btn";
  const map = { primary: "", secondary: "btn-sec" };
  const cls = [base, map[variant] || "", className].join(" ").trim();
  return <button {...props} className={cls} />;
}
