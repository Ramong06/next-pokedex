import React, { useState, useRef, useCallback } from 'react';
import Link from 'next/Link';


export default function Search() {

    const searchRef = useRef(null);
    const [query, setQuery] = useState('');
    const [active, setActive] = useState('');
    const [results, setResults] = useState('');

    const searchEndpoint = (query) => `api/search?q=${query}`;

    const onChange = useCallback((event) => {
        const query = event.target.value;
        setQuery(query)
        if (query.length) {
            fetch(searchEndpoint(query))
            .then(res => res.json())
            .then(res => {
                setResults(res.results)
            })
        } else {
            setResults([])
        }
    }, []);

    const onFocus = useCallback(() => {
        setActive(true)
        window.addEventListener('click', onClick)
    }, []);

    const onClick = useCallback((event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
            setActive(false);
            window.removeEventListener('click', onClick);
        }
    }, []);

    return (
        <div className="search-bar" ref={searchRef}>
            <input 
                className="search-input"
                onChange={onChange}
                onFocus={onFocus}
                placeholder="Search Pokemon"
                type='text'
                value={query}
            />
            { active && results.length > 0 && (
                <ul className="search-results">
                    {results.map(({ id, title }) => (
                        <li className="search-result" key={id}>
                            <Link href={res} as={res}>
                                <a>{type}</a>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
