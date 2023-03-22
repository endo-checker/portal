import React, { useState } from 'react';

import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { SxProps } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';

type SearchBarProps = {
    value: string;
    onChange: (value: string) => void;
    sx?: SxProps;
}

type EventTag = {
    target: {
        value: string;
    }
}
type EKey = {
    key: string;
}

export const SearchBar = ({ value, onChange, sx }: SearchBarProps) => {
    const [term, setTerm] = useState(value || "");

    const handleChange = (e: EventTag) => {
        setTerm(e.target.value);
    };

    const handleKeyDown = (e: EKey) => {
        if (e.key === 'Enter') {
            onChange(term);
        }
    };

    const handleClear = () => {
        setTerm("");
        onChange("");
    }

    return (
        <OutlinedInput
            fullWidth
            sx={sx}
            id="search"
            color="secondary"
            size="small"
            value={term}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Search..."
            startAdornment={
                <InputAdornment position="start">
                    <SearchIcon />
                </InputAdornment>
            }
            endAdornment={
                <InputAdornment position="end">
                    <ClearIcon fontSize="small" onClick={handleClear} sx={{ cursor: 'pointer' }} />
                </InputAdornment>
            }
            data-cy="search-input"
        />
    );
};



export default SearchBar;