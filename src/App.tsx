import React, { useState, useEffect } from 'react';
import './App.css';
import { Futbolista } from './components/Futbolista';
import { formatDate } from './components/Utils';
import FutbolistasTable from './components/FutbolistasTable';
import ReactPaginate from 'react-paginate';
import  axiosInstance  from './components/AxiosConfig';

const App: React.FC = () => {
  const [futbolistas, setFutbolistas] = useState<Futbolista[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const futbolistasPorPagina = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/futbolistas');
        setFutbolistas(response.data);
      } catch (error) {
        setError("Error al cargar los datos.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  const fetchFutbolistaById = async (id: number) => {
    try {
      const response = await axiosInstance.get(`/futbolistas/${id}`);
      alert(`Id: ${response.data.id}\nNombre: ${response.data.nombre}\nApellidos: ${response.data.apellidos}\nFecha de Nacimiento: ${formatDate(response.data.fechaNacimiento)}\nCaracterísticas: ${response.data.caracteristicas}`);
    } catch (error) {
      setError("Error al cargar los detalles del futbolista.");
    }
  };

  const offset = currentPage * futbolistasPorPagina;
  const futbolistasMostrados = futbolistas.slice(offset, offset + futbolistasPorPagina);

  return (
    <div>
      <h1 className="titulo">Lista de Futbolistas</h1>

      {isLoading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <FutbolistasTable futbolistas={futbolistasMostrados} fetchFutbolistaById={fetchFutbolistaById} />

          <ReactPaginate
            previousLabel={"Anterior"}
            nextLabel={"Siguiente"}
            pageCount={Math.ceil(futbolistas.length / futbolistasPorPagina)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"paginacion"}
            activeClassName={"active"}
          />
        </>
      )}
    </div>
  );
};

export default App;
