import styles from './BookCard.module.css'


// book cover_i er id i open library
export default function BookCard({ book }) {
  const imageUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : null;

    // nul hvis der ikke er et


// return viser imageurl hvis der er et ellers viser den ingen omslag

  return (
    <div className={styles.card}>
      {imageUrl ? (
        <img src={imageUrl} alt={book.title} className={styles.cover} />
      ) : (
        <div className={styles.noCover}>Ingen omslag</div>
      )}

      <h3 className={styles.title}>{book.title}</h3>

     
    </div>
  );
}

