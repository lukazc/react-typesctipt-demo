import { useState } from 'react'
import './App.css'

function App() {
    const [searchQuery, setSearchQuery] = useState<string>("");

    const welcome = {
        greeting: "Hello",
        name: "World"
    }

    return (
        <>
            <div>
                <h1>{welcome.greeting} {welcome.name}!</h1>
                <label htmlFor='search'>Search: </label>
                <input id="search" type="text" placeholder="Enter text here" onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <ul>
                { searchQuery.split('').map((char, index) => (
                    <li key={index}>{char}</li>
                ))}
            </ul>
        </>
    )
}

export default App
