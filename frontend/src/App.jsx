import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams, Route, Routes, useLocation, Link } from 'react-router-dom';

import SearchBar from "./components/Searchbar/SearchBar";
import BookList from "./components/BookList/BookList";

import Pagination from './components/Pagination/Pagination';

import styles from './App.module.css';

import BookPage  from './components/pages/bookpage/BookPage'

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const location = useLocation();

  // state react hooks

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);



useEffect(() => {
  if (location.pathname === "/" && !search) { // den er på homepage og der er ikke søgt efter noget 
    const fetchDefaultBooks = async () => { // så køre fetchdefult venter og svare med fetch og laver det til json
      try {
        setLoading(true);
        const res = await fetch(`https://openlibrary.org/search.json?title=harry+potter&page=${page}`);
        const data = await res.json();

        setBooks((data.docs || []).slice(0, 8)); // data docs ser array og henter de første 8 bøger
        setTotalPages(Math.ceil((data.numFound || 0) / 8)); // data.numfound ser om der er et nummer ellers viser 0 totalpages ved hvor mangesider når divideret med 8


      } catch (err) {
        console.error("Default fetch error:", err);
        setBooks([]); // sætter til 0
        setTotalPages(1); // 1 side
      } finally {
        setLoading(false); // stop loading
      }
    };

    
    fetchDefaultBooks();
  }
}, [location.pathname, search, page]); // den køre når de her ting ændres
  

  const fetchBooks = useCallback(async () => { // usecallback husker en funktion   
  if (location.pathname !== "/") return; // hvis den ikke er på homepage laver den en return

   
// hvis den ikke søger viser den ikke nye bøger

  if (!search) {
    setBooks([]);
    setTotalPages(1);
    return; 
  }

  // loader og viser 8 bøger

  try {
    setLoading(true);
    const limit = 8; 


    const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(search)}&page=${page}`;

    const res = await fetch(url); // request
    const data = await res.json(); // svare og laver til json

    
    setBooks((data.docs || []).slice(0, limit)); // data.docs er alle bøger sclice 0 limit viser 8

    
    setTotalPages(Math.ceil((data.numFound || 0) / limit)); // math.cell finder hvor mange sider ialt  data.numfound viser hvor mange bøger fundet


    // fejl besked
  } catch (err) {
    console.error("Fetch error:", err);
    setBooks([]);
    setTotalPages(1);
  } finally {
    setLoading(false); // stop loading
  }
}, [search, page, location.pathname]); // hvis de ændres opdatere fetchbooks


// useeffect køre fetchbooks

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  // opdatrer serach

  const handleSearch = (value) => {
    setSearchParams({ search: value, page: 1 });
  };

  // viser ny side searchparams kan bruges til at opdatere query af den url man klikker på

  const handlePageChange = (newPage) => {
    setSearchParams({ search, page: newPage });
  };


  const isBookList = location.pathname === "/"; // den ser om man er på homepage
  const isAddBook = location.pathname === "/add-book"; // ser om man er på addbook 

// Link "/" på homepage isbooklist hvis den er der ellers empty string ""

// Link to add book isaddbook   vis den er der ellers ""

// searchterm om der er skrevet noget i input setsearchterm opdatere hvis der skrives nyt hvis den loader indlæser bøger 

  return (
    <div className={styles.container}>
      <h1>Søg efter bog</h1>

      <div className={styles.tabs}>
        <Link to="/" className={`${isBookList ? "active" : ""}`}>Søg bøger</Link>
        <Link to="/add-book" className={`${isAddBook ? "active" : ""}`}>Tilføj bog</Link>
      </div>
      
      <ToastContainer /> 

      

      <Routes>
        
        <Route
          path="/"
          element={
            <>
              <SearchBar searchTerm={search} setSearchTerm={handleSearch} /> 
              {loading ? (
                <p className={styles.loading}>Indlæser bøger...</p>
              ) : (
                <BookList books={books} />
              )}
              <Pagination
                page={page}
                setPage={handlePageChange}
                totalPages={totalPages}
              />
            </>
          }
        />
        <Route path="/add-book" element={<BookPage />} />
      </Routes>
    </div>
  );
}