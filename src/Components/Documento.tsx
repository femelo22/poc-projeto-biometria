import { Box, Button, Container, Modal, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface Documento {
  idProcesso: string,
  idImagem: string,
  tipo: string,
  classe: string,
  score: string,
  dataEntradaDocumento: number
}

export default function Documento({classe, score, idImagem}: Documento) {

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setBase64("");
  }
  const [base64, setBase64] = useState("");

  async function getImage(idImagem: string) {
    console.log(idImagem)
    try {
      setOpen(true)
      const response = await axios.get(`http://localhost:3030/documents/${idImagem}`);
      setBase64(response.data.base64);
    } catch (error) {
      console.log("Error: " + error)
    }
  }

  return (
    <Container>
      <Button onClick={() => {getImage(idImagem)}}>{classe}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {classe}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Score: {score}
          </Typography>
          {
            base64 ? <img className="imgDocumento" src={`${base64}`} width={400} height={300} alt="" /> :  <Typography id="modal-modal-description" sx={{ mt: 2 }}>Erro ao carregar imagem</Typography>
          }
        </Box>
      </Modal>
    </Container>
  );
}
