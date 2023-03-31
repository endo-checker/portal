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

const SearchBar = (props: SearchBarProps): React.ReactElement => {
    const { value, onChange } = props;

    const [term, setTerm] = useState(value || "");

    const handleChange = (e: EventTag) => {
        setTerm(e.target.value);
    };


    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement | HTMLDivElement>) => {
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
            {...props}
            type="search"
            fullWidth
            id="search"
            color="secondary"
            size="small"
            value={term}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e)}
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