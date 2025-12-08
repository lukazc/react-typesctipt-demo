import { useEffect, useState } from 'react'
import './App.css'

type Dev = {
    objectID: number;
    url: string;
    title: string;
    author: string;
    num_comments: number;
    points: number;
};

const useStorageState = (key: string, initialValue: string) => {
    const [state, setState] = useState<string>(() => {
        const storedValue = localStorage.getItem(key);
        return storedValue ? storedValue : initialValue;
    });

    useEffect(() => {
        localStorage.setItem(key, state);
    }, [key, state]);

    return [state, setState] as const;
}

const App = () => {
    const [searchQuery, setSearchQuery] = useStorageState('searchQuery', '');

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
                <LabeledInput id='search' value={searchQuery} onInputChange={(e) => setSearchQuery(e.target.value)}>
                    <strong>Search:</strong>
                </LabeledInput>
            </div>

            <hr />

            <List list={searchedList} />
        </>
    )
}

// Update Search to accept setSearchQuery as a prop
type LabeledInputProps = {
    id: string;
    type?: string;
    value: string;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    children?: React.ReactNode;
};

const LabeledInput = ({
    id,
    type = 'text',
    value,
    onInputChange,
    children
}: LabeledInputProps) => (
    <>
        <label htmlFor={id}>{children}</label>
        &nbsp;
        <input
            id={id}
            type={type}
            value={value}
            onChange={onInputChange}
            autoFocus
            onBlur={(e) => console.log('Search blurred:', e.target.value)}
            placeholder="Search..."
        />
    </>
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

const ListItem = ({ item: {
    title, url, author, num_comments, points
} }: { item: Dev }) => {

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
