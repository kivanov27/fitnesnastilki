import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";

const SearchBar = () => {
    const [searchText, setSearchText] = useState<string>("");
    const router = useRouter();

    const search = () => {
        if (!searchText.trim()) return;
        router.push(`/katalog/search?q=${encodeURIComponent(searchText)}`)
    };

    return (
        <div className="w-48 flex gap-x-2" aria-label="Search bar">
            <input 
                type="text" 
                value={searchText}
                onChange={({ target }) => setSearchText(target.value)}
                className="w-4/5 px-2 rounded-lg focus:outline-none"
            >
            </input>
            <button onClick={search}>
                <SearchIcon />
            </button>
        </div>
    );
};

export default SearchBar;
