import { useState } from 'react'
import './App.css'

type Dev = {
    objectID: number;
    url: string;
    title: string;
    author: string;
    num_comments: number;
    points: number;
};

const App = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");

    const devList: Dev[] = [
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

    const searchedList = devList.filter(item => {
        const searchTerm = searchQuery.toLowerCase();
        return (
            item.title.toLowerCase().includes(searchTerm) ||
            item.author.toLowerCase().includes(searchTerm)
        );
    });

    return (
        <>
            <div>
                <h1>Hacker list</h1>
                <Search setSearchQuery={setSearchQuery} />
            </div>

            <hr />

            <List list={searchedList} />
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
            onBlur={(e) => console.log('Search blurred:', e.target.value)}
            placeholder="Search..."
        />
    </div>
);

const List = ({ list }: { list: Dev[] }) => (
    <ul>
        {list.map((item) => {
            const { objectID } = item;

            return (
                <ListItem key={objectID} item={item} />
            )
        })}
    </ul>
);

const ListItem = ({ item }: { item: Dev }) => {
    const { title, url, author, num_comments, points } = item;

    return (
        <li>
            <h2>{title}</h2>
            <p>Author: {author}</p>
            <p>Comments: {num_comments}</p>
            <p>Points: {points}</p>
            <a href={url} target="_blank" rel="noopener noreferrer">Read more</a>
        </li>
    );
};

export default App
