export default function closeMenu(e, id) {
  if (e) e.preventDefault();
  window.dispatchEvent(
    new CustomEvent("menuToggle", { detail: { isActive: false } }),
  );
  setTimeout(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, 900);
}