import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [backendLog, setBackendLog] = useState<string | null>(null)
  const apiUrl = "http://localhost:8000"

  useEffect(() => {
  setLoading(true)
  fetch(`${apiUrl}/count`)
    .then(res => res.json())
    .then(data => {
      setBackendLog(`Réponse brute du backend: ${JSON.stringify(data)}`)
      setCount(data.count_number)
      setError(null)
      setLoading(false)
    })
    .catch(err => {
      setError('Erreur de connexion au backend: ' + err.message)
      setBackendLog(`Erreur: ${err.message}`)
      setLoading(false)
    })
}, [])

  const incrementCount = () => {
    setLoading(true)
    fetch(`${apiUrl}/count/increment`, { method: 'POST' })
      .then(res => res.json())
      .then(data => {
        setCount(data.count_number)
        setError(null)
        setLoading(false)
      })
      .catch((err) => {
        setError('Erreur lors de l\'incrémentation: ' + err.message)
        setLoading(false)
      })
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + FastAPI + PostgreSQL</h1>
      <div className="card">
        {error && <p style={{color: 'red'}}>{error}</p>}
        {backendLog && <pre style={{background: '#eee', padding: '8px'}}>{backendLog}</pre>}
        <button onClick={incrementCount} disabled={loading || count === null}>
          {loading ? 'Chargement...' : `count is ${count}`}
        </button>
        <p>
          Ce compteur est stocké dans la base PostgreSQL et géré par FastAPI.<br />
          Edit <code>src/App.tsx</code> et sauvegarde pour tester HMR.
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App