import { useState } from 'react'
import './App.css'

const devList = [
    {
        title: 'React',
        url: 'https://reactjs.org/',
        author: 'Jordan Walke',
        num_comments: 3,
        points: 4,
        objectID: 0,
    },
    {
        title: 'Redux',
        url: 'https://redux.js.org/',
        author: 'Dan Abramov, Andrew Clark',
        num_comments: 2,
        points: 5,
        objectID: 1,
    },
];

const App = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");

    return (
        <>
            <div>
                <h1>Hacker list</h1>
                <Search setSearchQuery={setSearchQuery} />
            </div>

            <hr />

            <List searchQuery={searchQuery} />
        </>
    )
}

// Update Search to accept setSearchQuery as a prop
type SearchProps = {
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

const Search = ({ setSearchQuery }: SearchProps) => (
    <div>
        <input
            type="text"
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
        />
    </div>
);

const List = ({ searchQuery }: { searchQuery: string }) => (
    <ul>
        {devList.map((item) => {
            const { title, url, author, num_comments, points, objectID } = item;
            const searchTerm = searchQuery.toLowerCase();
            const isMatch = title.toLowerCase().includes(searchTerm) || author.toLowerCase().includes(searchTerm);

            return (
                <li key={objectID} style={{ display: isMatch ? 'block' : 'none' }}>
                    <h2>{title}</h2>
                    <p>Author: {author}</p>
                    <p>Comments: {num_comments}</p>
                    <p>Points: {points}</p>
                    <a href={url} target="_blank" rel="noopener noreferrer">Read more</a>
                </li>
            )
        })}
    </ul>
);

export default App
