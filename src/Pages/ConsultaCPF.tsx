import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import Documento from "../Components/Documento";


export default function ConsultaCPF() {

  interface Documento {
    idProcesso: string,
    idImagem: string,
    tipo: string,
    classe: string,
    score: string,
    dataEntradaDocumento: number
  }

  const [cpf, setCpf] = useState("");
  const [nome, setNome] = useState("");
  const [sexo, setSexo] = useState("");
  const [responsavelCriacao, setResponsavelCriacao] = useState("");
  const [dataCriacao, setDataCriacao] = useState("");
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [showInfo, setShowInfo] = useState(true);

  async function findUserByCPF(cpf: string) {
    try {
      const response = await axios.get(`http://localhost:3030/users/${cpf}`);

      if(response.data) {
        setNome(response.data.nome)
        setResponsavelCriacao(response.data.responsavelCriacao)
        setSexo(response.data.sexo)
        setDataCriacao(response.data.dataCriacao)
        setDocumentos(response.data.documentos)
        setShowInfo(false);
      }

    } catch (error) {
      alert(`CPF ${cpf} não encontrado!`)
      console.error(error);
    }
  }

  function handleSubmit(e: any) {
    e.preventDefault(); // para nao atualizar a pagina (comportamento do formulario form)
    if(cpf) {
      findUserByCPF(cpf);
    }
  }

  return (
    <div>
       <form onSubmit={handleSubmit}>
          <h1>Buscar CPF:</h1>
          <TextField id="busca-cpf" label="CPF" variant="outlined" value={cpf} onChange={ (e) => setCpf(e.target.value) }/> <br />
          <Button type="submit" variant="outlined">Buscar</Button>

          <Button onClick={() => setShowInfo(true)} variant="outlined">Limpar</Button>
          {/* <Button variant="outlined">Limpar</Button> */}
        </form>
        <hr />
        <div hidden={showInfo}>
          <TextField id="nome" label="Nome" variant="outlined" value={nome} />

          <TextField id="sexo" label="Sexo" variant="outlined" value={sexo} />

          <TextField id="responsavel" label="Responsável Criação" variant="outlined" value={responsavelCriacao} />

          <TextField id="dataCriacao" label="Data Criação" variant="outlined" value={dataCriacao} />

          {documentos.map((item, index) => {
            return <Documento {...item} key={index} />
          })}
 
        </div>
    </div>

  )

} 