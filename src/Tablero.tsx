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
  const filas = [];

  for (let fila = 0; fila < TAMANO_TABLERO; fila++) {
    const celdasFila = [];

    for (let columna = 0; columna < TAMANO_TABLERO; columna++) {
      const esCabeza = serpiente[0].x === columna && serpiente[0].y === fila;
      const esCuerpo = serpiente.slice(1).some(
        (segmento) => segmento.x === columna && segmento.y === fila
      );
      const esComida = comida.x === columna && comida.y === fila;

      let claseCelda = 'celda';
      if (esCabeza) claseCelda += ' cabeza';
      else if (esCuerpo) claseCelda += ' cuerpo';
      else if (esComida) claseCelda += ' comida';

      celdasFila.push(
        <td key={`${fila}-${columna}`} className={claseCelda} />
      );
    }

    filas.push(<tr key={`fila-${fila}`}>{celdasFila}</tr>);
  }

  return (
    <table className="tablero">
      <tbody>{filas}</tbody>
    </table>
  );
}