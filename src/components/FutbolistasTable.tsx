import React from 'react';
import { Futbolista } from './Futbolista';
import { formatDate } from './Utils';

interface FutbolistasTableProps {
  futbolistas: Futbolista[];
  fetchFutbolistaById: (id: number) => void;
}

const FutbolistasTable: React.FC<FutbolistasTableProps> = ({ futbolistas, fetchFutbolistaById }) => {

  return (
    <table className="tabla">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Apellidos</th>
          <th>Fecha de Nacimiento</th>
          <th>Características</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {futbolistas.map((futbolista) => (
          <tr key={futbolista.id}>
            <td>{futbolista.nombre}</td>
            <td>{futbolista.apellidos}</td>
            <td>{formatDate(futbolista.fechaNacimiento)}</td>
            <td>{futbolista.caracteristicas}</td>
            <td>
              <button onClick={() => fetchFutbolistaById(futbolista.id)}>Detalles</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FutbolistasTable;
