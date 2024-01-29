import styles from "./SearchBar.module.css";
import { useSearchHandler } from "../hooks/useSearchHandler";

function SearchBar() {
  const { setSearch, submitHandler, search } = useSearchHandler();

  return (
    <div className={styles.searchBar}>
      <form onSubmit={submitHandler}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search entire store here..."
        />
        <img src="/images/search-icon.svg" alt="search-icon" />
      </form>
    </div>
  );
}

export default SearchBar;
