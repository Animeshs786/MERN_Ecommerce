import styles from "./CustomTable.module.css";
import CustomPagination from "./CustomPagination";

function CustomTable({ thead, children }) {
  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableWrapper}>
        <table >
          <thead>
            <tr>
              {thead.map((ele, i) => (
                <th key={i}>{ele}</th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
      <div className={styles.paginationWrapper}>
        {/* <CustomPagination /> */}
      </div>
    </div>
  );
}

export default CustomTable;
