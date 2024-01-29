import NavItems from "./NavItmes";

function NavBar() {
  return (
    <nav style={{ borderBottom: "1px solid var(--base-light-gray)" }}>
      <NavItems />
    </nav>
  );
}

export default NavBar;
