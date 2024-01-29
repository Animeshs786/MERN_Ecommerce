import styles from "./Select.module.css";

function Select({
  required = false,
  label,
  options = [],
  optionWithValue = null,
  placeholder = "Choose Options",
  id,
  register,
  validation,
  errors,
}) {
  return (
    <div className={styles.selectWrapper}>
      <label>
        {label} {required && <span>*</span>}
      </label>
      <select id={id} {...register(id, validation)}>
        <option value="">{placeholder}</option>
        {optionWithValue
          ? optionWithValue?.map((item, i) => (
              <option key={i} value={item.value}>
                {item.name}
              </option>
            ))
          : options?.map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
      </select>
      {errors?.[id]?.message && <span>{errors?.[id]?.message}</span>}
    </div>
  );
}

export default Select;
