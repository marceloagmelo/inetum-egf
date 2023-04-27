import React, { useState, useEffect } from "react";
import { getDocumentsByCategory } from '../../functions/Service';


export default function Table(configuration, { data }) {
    const [sortColumn, setSortColumn] = useState("Nome"); // Estado que controla a coluna de ordenação
    const [sortDirection, setSortDirection] = useState("asc"); // Estado que controla a direção da ordenação
    const [sortedData, setSortedData] = useState([]); // Estado que armazena os dados ordenados

    useEffect(() => {
        getDocuments(); // Executa a função getDocuments() sempre que os estados sortColumn ou sortDirection mudarem
    }, [sortColumn, sortDirection]);

    const getDocuments = async () => {
        getDocumentsByCategory(configuration, sortDirection, sortColumn).then(result => {
            const size = Object.keys(result).length;
            result && size > 0 ? setSortedData(result.data) : console.log(result); 
            // Armazena os dados ordenados no estado sortedData
        }).catch(err => {
            console.log(err);
        })
    };

    const handleSort = (column) => { // Função que ordena a tabela com base na coluna passada como argumento
        if (column === sortColumn) { // Se a coluna já estiver selecionada
            setSortDirection(sortDirection === "asc" ? "desc" : "asc"); // Inverte a direção da ordenação
        } else {
            setSortColumn(column); // Seleciona uma nova coluna de ordenação
            setSortDirection("asc"); // Define a direção da ordenação como ascendente
        }
    };

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col" onClick={() => handleSort("Nome")}>
                        Nome
                        {sortColumn === "Nome" && (
                            <span>{sortDirection === "asc" ? " ▲" : " ▼"}</span>
                        )}
                    </th>
                    <th scope="col" onClick={() => handleSort("Tipo")}>
                        Tipo
                        {sortColumn === "Tipo" && (
                            <span>{sortDirection === "asc" ? " ▲" : " ▼"}</span>
                        )}
                    </th>
                    <th scope="col" onClick={() => handleSort("Empresa")}>
                        Empresa
                        {sortColumn === "Empresa" && (
                            <span>{sortDirection === "asc" ? " ▲" : " ▼"}</span>
                        )}
                    </th>
                    <th scope="col" onClick={() => handleSort("Data")}>
                        Data
                        {sortColumn === "Data" && (
                            <span>{sortDirection === "asc" ? " ▲" : " ▼"}</span>
                        )}
                    </th>
                </tr>
            </thead>
            <tbody>
                {sortedData.map((document) => {
                    return (
                        <tr key={document.id}>
                            <td>{document.Nome}</td>
                            <td>{document.Tipo}</td>
                            <td>{document.Empresa}</td>
                            <td>{document.Data}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

