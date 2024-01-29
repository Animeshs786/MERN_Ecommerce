import styles from "./Input.module.css";

function Input({
  type = "text",
  placeholder,
  value,
  required = false,
  label,
  id,
  register,
  validation = {},
  errors,
  multiple=false,
}) {
  return (
    <div className={styles.inputWrapper}>
      <label>
        {label} {required && <span>*</span>}
      </label>
      <input
        type={type}
        multiple={multiple}
        placeholder={placeholder}
        id={id}
        name={id}
        defaultValue={value}
        {...register(id, validation)}
      />
      {errors?.[id]?.message && <span>{errors?.[id]?.message}</span>}
    </div>
  );
}

export default Input;
