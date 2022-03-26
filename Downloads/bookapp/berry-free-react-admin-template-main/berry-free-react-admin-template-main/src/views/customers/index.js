import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Card, CardContent, TextField, InputAdornment, SvgIcon, Typography } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import SearchIcon from '@mui/icons-material/Search';

const columns = [
    { field: 'id', headerName: 'S.No.', width: '50' },
    { field: 'name', headerName: 'Name', width: '200' },
    { field: 'company', headerName: 'Company Name', width: '200' },
    {
        field: 'role',
        headerName: 'Role',
        width: '200'
    },
    {
        field: 'status',
        headerName: 'State',
        sortable: false,
        width: '200'
    },
    {
        field: 'verified',
        headerName: 'Varified',
        sortable: false,
        width: '200'
    }
];

const axios = require('axios');

export default function Customers() {
    const [companiesList, setCompliesList] = useState([]);
    useEffect(() => {
        axios
            .post('https://demo1779595.mockable.io/companies')
            .then((response) => {
                setCompliesList(response.data.companiesList);
                console.log(response.data.companiesList);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const rows = companiesList.map((el, i) => {
        el.id = i + 1;
        return el;
    });
    console.log(rows);

    return (
        <>
            <Box>
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        m: -1
                    }}
                    style={{ background: 'white', borderRadius: '10px', padding: '10px', margin: '5px' }}
                >
                    <Typography sx={{ m: 1 }} variant="h2">
                        Customers
                    </Typography>
                    <Box sx={{ m: 1 }}>
                        <Button startIcon={<FileUploadIcon fontSize="small" />} sx={{ mr: 1 }}>
                            Import
                        </Button>
                        <Button startIcon={<FileDownloadIcon fontSize="small" />} sx={{ mr: 1 }}>
                            Export
                        </Button>
                        <Button color="secondary" variant="contained">
                            Add Customers
                        </Button>
                    </Box>
                </Box>
                <Box sx={{ mt: 3 }}>
                    <Card>
                        <CardContent>
                            <Box sx={{ maxWidth: 500 }}>
                                <TextField
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start" size="small">
                                                <SvgIcon color="action" fontSize="small">
                                                    <SearchIcon />
                                                </SvgIcon>
                                            </InputAdornment>
                                        )
                                    }}
                                    placeholder="Search customer"
                                    variant="outlined"
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
            <div style={{ height: 400, width: '100%', background: 'white' }}>
                <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} checkboxSelection />
            </div>
        </>
    );
}
