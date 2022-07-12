import { Box, Button, TextField, Typography, Container, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../../http";

export default function FormularioRestaurante() {

    const parametros = useParams()

    useEffect(() => {
        if (parametros.id) {
            http.get(`restaurantes/${parametros.id}/`)
                .then(resposta => setNomeRestaurante(resposta.data.nome))
        }
    }, [parametros])

    const [nomeRestaurante, setNomeRestaurante] = useState('')

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()
        if (parametros.id) {
            http.put(`restaurantes/${parametros.id}/`, {
                nome: nomeRestaurante
            })
                .then(() => {
                    alert('atualizado com sucesso!')
                })
                .catch(erro => {
                    alert(erro.message)
                })

        } else {
            http.post('restaurantes/', {
                nome: nomeRestaurante
            })
                .then(() => {
                    alert('cadastrado com sucesso!')
                })
                .catch(erro => {
                    alert(erro.message)
                })
        }
    }

    return (
        <Box>
            <Container maxWidth="lg" sx={{ mt: 1 }}>
                <Paper sx={{ p: 2 }}>
                    {/* Conteúdo da pagina */}
                    <Box sx={{ display: 'flex', flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
                        <Box component="form" sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
                            <Typography component="h1" variant="h6">Formulário de Restaurantes</Typography>
                            <TextField
                                value={nomeRestaurante}
                                onChange={evento => setNomeRestaurante(evento.target.value)}
                                label="Restaurante"
                                variant="outlined"
                                fullWidth
                                required
                            />
                            <Button sx={{ marginTop: 2 }} type="submit" fullWidth variant="outlined">Salvar</Button>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Box>
    )
}