import styles from './SearchBar.module.css'


export default function SearchBar  ( {  searchTerm, setSearchTerm } ) {


// searrchterm =nuværendde søgetekst, setsearchterm= funktion til at opdatere søgetekster
    return (
        <div className={styles.container}>

          {/* Input-felt hvor brugeren kan skrive søgetekst */}
            {/* value = searchTerm så feltet styres af state */}
            {/* onChange = opdaterer searchTerm når brugeren skriver */}

          
            <input type="text" placeholder="Søg på titel..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={styles.input} />
        </div>
    ); 
  
  
  
  
  } 