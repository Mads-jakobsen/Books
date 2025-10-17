import BookCard from '../BookCard/BookCard'
import styles from './BookList.module.css'

// books er prop

// hvis den ikke finder nogle bøger no books found ellers retunere den en div der mapper igennem books den køre bookcard der får book som prop key kender listen

export default function BooksList({books}) {
  if (!books.length) return <p className={styles.empty}>No books found.</p>

  return ( 
  <div className={styles.grid}>
      {books.map((book) => (
        <BookCard key={book.key} book={book} />
      ))}
    </div>
  )

}