import React from 'react';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

type FileUploadProps = {
    accept?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    title?: string;
    variant?: 'text' | 'outlined' | 'contained';
}

const FileUpload = (props: FileUploadProps): JSX.Element => {
    const { accept, onChange, title, variant } = props;

    return (
        <Box>
            <input
                {...props}
                multiple
                accept={accept || '.xlsx,.xls,image/*,.doc,.docx,.txt,.rtf,.pdf'}
                style={{ display: 'none', }}
                id={"file-upload"}
                type="file"
                onChange={onChange}
            />
            <label htmlFor={'file-upload'}>
                <Button
                    sx={{ height: '100%' }}
                    variant={variant || 'outlined'}
                    component="span"
                    startIcon={<CloudUploadIcon />}
                >
                    {title || 'Upload'}
                </Button>
            </label>
        </Box>
    );
};

export default FileUpload;