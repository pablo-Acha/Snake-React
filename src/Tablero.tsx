import './Tablero.css';

interface Posicion {
  x: number;
  y: number;
}

interface TableroProps {
  serpiente: Posicion[];
  comida: Posicion;
}

const TAMANO_TABLERO = 8;

export default function Tablero({ serpiente, comida }: TableroProps) {
  const filas = Array.from({ length: TAMANO_TABLERO }, (_, i) => i);
  const columnas = Array.from({ length: TAMANO_TABLERO }, (_, i) => i);

  return (
    <table className="tablero">
      <tbody>
        {filas.map((fila) => (
          <tr key={`fila-${fila}`}>
            {columnas.map((columna) => {
              const esCabeza = serpiente[0].x === columna && serpiente[0].y === fila;
              const esCuerpo = serpiente.slice(1).filter(
                (segmento) => segmento.x === columna && segmento.y === fila
              ).length > 0;
              const esComida = comida.x === columna && comida.y === fila;

              let claseCelda = 'celda';
              if (esCabeza) claseCelda += ' cabeza';
              else if (esCuerpo) claseCelda += ' cuerpo';
              else if (esComida) claseCelda += ' comida';

              return (
                <td key={`${fila}-${columna}`} className={claseCelda} />
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}