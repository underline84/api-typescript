import { useState } from "react"
import IRestaurante from "../../../interfaces/IRestaurante"
import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material"
import { useEffect } from "react"
import axios from "axios"

export default function AdministracaoRestaurantes() {

    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

    useEffect(() => {
        axios.get<IRestaurante[]>('http://localhost:8000/api/v2/pratos/')
        .then(resposta => setRestaurantes(resposta.data))
    }, [])

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Nome
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {restaurantes.map(restaurante => 
                    <TableRow key={restaurante.id}>
                        <TableCell>
                            {restaurante.nome}
                        </TableCell>
                    </TableRow>)}
                </TableBody>
            </Table>
        </TableContainer>
    )
}