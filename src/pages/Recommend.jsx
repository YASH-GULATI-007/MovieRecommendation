import MovieCard from "../components/MovieCard";
import { useState, useEffect } from 'react';
import data from '../jsonfiles/all_recommendations.json';
import { searchMovies } from "../services/api";
import '../css/Recommend.css'
function Recommend() {
// Fetching data for all catagerories-------------------------------------
  const [adventure, setAdventure] = useState([]);
  const [fantasy, setFantasy] = useState([]);
  const [action, setAction] = useState([]);
  const [crime, setCrime] = useState([]);
  const [drama, setDrama] = useState([]);
  const [thriller, setThriller] = useState([]);
  const [animated, setAnimated] = useState([]);
  const [family, setFamily] = useState([]);
  const [western, setWestern] = useState([]);
  const [comedy, setComedy] = useState([]);
  const [romance, setRomance] = useState([]);
  const [horror, setHorror] = useState([]);
  const [mystery, setMystery] = useState([]);
  const [history, setHistory] = useState([]);
  const [war, setWar] = useState([]);
  const [music, setMusic] = useState([]);
  const [documentary, setDocumentary] = useState([]);
  const [foreign, setForeign] = useState([]);
  const [tvMovie, setTvMovie] = useState([]);
  const [scienceFiction, setScienceFiction] = useState([]);
  useEffect(() => {
    setAdventure(data.adventur || []);
    setFantasy(data.fantasi || []);
    setAction(data.action || []);
    setCrime(data.crime || []);
    setDrama(data.drama || []);
    setThriller(data.thriller || []);
    setAnimated(data.anim || []);
    setFamily(data.famili || []);
    setWestern(data.western || []);
    setComedy(data.comedi || []);
    setRomance(data.romanc || []);
    setHorror(data.horror || []);
    setMystery(data.mysteri || []);
    setHistory(data.histori || []);
    setWar(data.war || []);
    setMusic(data.music || []);
    setDocumentary(data.documentari || []);
    setForeign(data.foreign || []);
    setTvMovie(data.tvMovi || []);
    setScienceFiction(data.sciencFict || []);
  }, []);
  console.log(adventure)
//------------------------------------------------------------------------

  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleFetch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return
    if (loading) return
    setLoading(true)

    try {
      const fetchResults = await searchMovies(fetchQuery)
      setMovies(fetchResults)
      setError(null)
    } catch (err) {
      console.log(err)
      setError("Failed to search movies...")
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="recommend">
            <h2>Search Using Genres</h2>
            <form onSubmit={handleFetch}>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter genre"
                />
                <button type="submit">Search</button>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <div className="movie-list">
                {adventure.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
  );
}

export default Recommend;