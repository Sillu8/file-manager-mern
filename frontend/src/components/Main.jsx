import styled from '@emotion/styled';
import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, Grid, Modal, Paper, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { API } from '../axios';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import toast from 'react-hot-toast'
import SearchBar from './SearchBar';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#F5F5DC',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  cursor: 'pointer',
  height: '100px',
  width: '100px',
}));


const Main = () => {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [searchData, setSearchData] = useState([]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  const [clickedItem, setClickedItem] = useState('')

  const fileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  const handleSubmit = async () => {
    const data = new FormData();
    data.append('file', file);
    try {
      handleClose();
      const res = await API.post('/file', data)
      setFiles(res.data.data)
      toast.success('Successfully added a file.')
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
  }

  const fetchFiles = async () => {
    try {
      const res = await API.get('/file/all');
      setFiles(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  const downloadFile = async () => {
    try {
      const response = await API.get(
        `file/download/${clickedItem}`,
        { responseType: "blob" }
      );
      const href = URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = href;
      link.setAttribute(
        "download",
        `${clickedItem}.docx`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    } catch (error) {
      console.error(error);
    } 
  };

  const handleClick = (id) => {
    setClickedItem(id)
  }

  useEffect(() => {
    fetchFiles();
  }, [])


  return (
    <Container maxWidth='md'>
      <Grid container spacing={2} marginTop>
        <Grid item xs={6}>
          <Button onClick={handleOpen} variant="contained">Add File</Button>
        </Grid>
        <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <SearchBar setSearchData={setSearchData} />
        </Grid>
      </Grid>


      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" textAlign={'center'} marginBottom>
            Add a file
          </Typography>
          <TextField type="file" onChange={fileChange} required />
          <Button sx={{ marginTop: '20px' }} variant='contained' onClick={handleSubmit}>POST</Button>
        </Box>
      </Modal>

      <Typography variant="h3" component="h2" color={'blueviolet'} textAlign='center' marginTop>
        {searchData?.length < 1 ? 'Files' : 'Search Results'}
      </Typography>

      {


        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          marginTop
        >
          {

            searchData?.length < 1 ?

              files.map(file => {
                return (
                  <Item
                    key={file?._id}
                    onClick={() => {
                      handleDialogOpen();
                      handleClick(file?._id);
                    }}
                  >
                    <InsertDriveFileIcon fontSize='large' />
                    <p>{file?.fileName}</p>
                  </Item>
                )
              })
              :
              searchData.map(file => {
                return (
                  <Item
                    key={file?._id}
                    onClick={() => {
                      handleDialogOpen();
                      handleClick(file?._id);
                    }}
                  >
                    <InsertDriveFileIcon fontSize='large' />
                    <p>{file?.fileName}</p>
                  </Item>
                )
              })
          }
        </Stack>
      }

      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to download this form?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>No</Button>
          <Button
            onClick={async () => {
              await downloadFile();
              handleDialogClose();
            }}
            autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

    </Container>
  )
}

export default Main