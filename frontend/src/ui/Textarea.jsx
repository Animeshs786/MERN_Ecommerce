import styles from "./Textarea.module.css";

function Textarea({
  required = false,
  label,
  value,
  rows,
  cols,
  register,
  errors,
  id,
  validation,
}) {
  return (
    <div className={styles.textWrapper}>
      <label>
        {label} {required && <span>*</span>}
      </label>
      <textarea
        defaultValue={value}
        rows={rows}
        cols={cols}
        {...register(id,validation)}
      />
      {errors?.[id]?.message && <span>{errors?.[id]?.message}</span>}
    </div>
  );
}

export default Textarea;
