import { useEffect, useState } from "react";
import styles from './BookPage.module.css';
import { toast } from "react-toastify";

// state react hooks

export default function BookPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [year, setYear] = useState("");
  const [author, setAuthor] = useState("");
  const [genres, setGenres] = useState("");
  const [pages, setPages] = useState("");
  const [publisher, setPublisher] = useState("");

  const [cover, setCover] = useState("");
  

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [rated, setRated] = useState("Not Rated"); 
const [rating, setRating] = useState("");

   const [toastCount, setToastCount] = useState(0);

// toastify

  const maxToasts = 3; // max 3 

  // hvis toastcount er midre end maxtoast viser den et skilt med beskeden. settoastcount laver en til hvis der ikke er 3

  useEffect(() => {
  
    if (toastCount < maxToasts) {
      toast.info("Tilføj de bedste bøger!");
      setToastCount(prev => prev + 1); 
    }
  }, [toastCount]); 


  // async funktion der kommer svar retur loading er true og setmessage sætter empty ""

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const newBook = {
      title,
      description,
      year: year ? parseInt(year, 10) : undefined,
      author: author ? author.split(",").map(a => a.trim()) : [], // split() går man kan skrive flere
      genres: genres ? genres.split(",").map(g => g.trim()) : [], // mapper hvert item i array trim() fjener white space 
      pages: pages ? parseInt(pages, 10) : undefined,
      publisher,
      cover,
        rated: rated.trim(),
  rating: rating ? parseInt(rating, 10) : undefined, // parseint laver noget i en string til number
    };

    //sender request til til backend api med ny bog info
    try {
      const res = await fetch("http://localhost:3000/my-books", {
        method: "POST", 
        headers: { "Content-Type": "application/json" }, // json der sendes
        body: JSON.stringify(newBook), 
      });


// hvis ikke respons er ok viser den fejlbesked

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Noget gik galt ved oprettelse af bogen");
      }

// bogen er oprettet

      const data = await res.json();
      setMessage(`${data.title} er oprettet, rating ${data.rating}/10`);


      // nulstiller form til at man kan indtaste ny bog

      setTitle("");
      setDescription("");
      setYear("");
      setAuthor("");
      setGenres("");
      setPages("");
      setPublisher("");
   
      setCover("");

    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };


// form når man opretter en bog

  return (
    <div className={styles.container}>
      <h2>Opret en ny bog</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Titel
          <input
            className={styles.input}
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)} 
            required
          />
        </label>

        {/* e.target.value hvad der bliver skrevet i input */}

        

  

        <label className={styles.label}>
          Beskrivelse
          <textarea
            className={styles.textarea}
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />
        </label>


<label className={styles.label}>
  Rated
  <select
    className={styles.input}
    value={rated}
    onChange={e => setRated(e.target.value)}
  >
    <option value="G">G</option>
    <option value="PG">PG</option>
    <option value="PG-13">PG-13</option>
    <option value="R">R</option>
    <option value="NC-17">NC-17</option>
    <option value="Not Rated">Not Rated</option>
  </select>
</label>

<label className={styles.label}>
  Rating (1-10)
  <input
    className={styles.input}
    type="number"
    value={rating}
    onChange={e => setRating(e.target.value)}
    min="1"
    max="10"
  />
</label>



        <label className={styles.label}>
          År
          <input
            className={styles.input}
            type="number"
            value={year}
            onChange={e => setYear(e.target.value)}
            required
          />
        </label>

        <label className={styles.label}>
          Forfatter
          <input
            className={styles.input}
            type="text"
            value={author}
            onChange={e => setAuthor(e.target.value)}
            required
          />
        </label>

        <label className={styles.label}>
          Genre
          <input
            className={styles.input}
            type="text"
            value={genres}
            onChange={e => setGenres(e.target.value)}
            required
          />
        </label>

        <label className={styles.label}>
          Sider
          <input
            className={styles.input}
            type="number"
            value={pages}
            onChange={e => setPages(e.target.value)}
            required
          />
        </label>

        <label className={styles.label}>
          Forlag
          <input
            className={styles.input}
            type="text"
            value={publisher}
            onChange={e => setPublisher(e.target.value)}
          />
        </label>

     

        <label className={styles.label}>
          Cover URL
          <input
            className={styles.input}
            type="text"
            value={cover}
            onChange={e => setCover(e.target.value)}
          />
        </label>

        <button
          type="submit"
          className={styles.button}
          disabled={loading}
        >
          {loading ? "Gemmer..." : "Opret bog"}   {/* hvis den loader viser den gemmer ellers viser den opret bog */}
        </button>
        

        {message && <p className={styles.message}>{message}</p>}
      </form>
    </div>
  );
  
}