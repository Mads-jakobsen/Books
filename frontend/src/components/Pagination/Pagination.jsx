import styles from './Pagination.module.css'
export default function Pagination ({ page, setPage, totalPages }) {
    return (
      <div className={styles.container}>
        <button
          onClick={() => setPage(page - 1)} // går en side tilbage
          disabled={page === 1} // kan ikke gå tilbage hvis den er på side 1
          className={styles.button}
        >
          Prev
        </button>
 
        <span className={styles.page}>
          Side {page} af {totalPages}
        </span>
 
        <button
          onClick={() => setPage(page + 1)} // en side frem
          disabled={page === totalPages} // kan ikke gå længere hvis den er på sidste side
          className={styles.button}
        >
          Next
        </button>
      </div>
    );
}