import { useState } from "react";
import styles from "./SearchBar.module.css";

export default function SearchBar({ setTopic }) {
  const [value, setValue] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (value.trim() !== "") {
      setTopic(value);
      setValue("");
    }
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <header className={styles.Searchbar}>
      <form className={styles.SearchForm} onSubmit={onSubmit}>
        <button type="submit" className={styles.button}>
          <span className={styles.buttonLabel}>Search</span>
        </button>

        <input
          onChange={onChange}
          className={styles.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={value}
        />
      </form>
    </header>
  );
}
