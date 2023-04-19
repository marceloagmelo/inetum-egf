import React from "react";

export default function Table({ data }) {
    return (
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">Tipo</th>
                            <th scope="col">Empresa</th>
                            <th scope="col">Data</th>
                        </tr>
                    </thead>

                     {data.map((document) => {
                            return <tbody key={document.id}>
                                <tr>
                                    <td>{document.Nome}</td>
                                    <td>{document.Tipo}</td>
                                    <td>{document.Empresa}</td>
                                    <td>{document.Data}</td>
                                </tr>
                            </tbody>
                        })} 

                </table>
    )
}