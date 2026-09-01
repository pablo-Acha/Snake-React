import { useState, type KeyboardEvent } from 'react';
import Tablero from './Tablero';
import './App.css';

interface Posicion {
  x: number;
  y: number;
}

const TAMANO = 8;

const POSICION_INICIAL_SERPIENTE: Posicion[] = [
  { x: 2, y: 0 },
  { x: 1, y: 0 },
  { x: 0, y: 0 },
];

const generarComida = (serpiente: Posicion[]): Posicion => {
  const casillasDisponibles: Posicion[] = [];

  for (let y = 0; y < TAMANO; y++) {
    for (let x = 0; x < TAMANO; x++) {
      const estaOcupado = serpiente.some(
        (seg) => seg.x === x && seg.y === y
      );
      if (!estaOcupado) {
        casillasDisponibles.push({ x, y });
      }
    }
  }

  const indice = Math.floor(Math.random() * casillasDisponibles.length);
  const elemento = casillasDisponibles[indice];

  return elemento;
};

function App() {
  const [serpiente, setSerpiente] = useState<Posicion[]>(POSICION_INICIAL_SERPIENTE);
  const [comida, setComida] = useState<Posicion>(() =>
    generarComida(POSICION_INICIAL_SERPIENTE)
  );

  const reiniciarJuego = () => {
    setSerpiente(POSICION_INICIAL_SERPIENTE);
    setComida(generarComida(POSICION_INICIAL_SERPIENTE));
  };

  const mover = (dx: number, dy: number) => {
    setSerpiente((serpienteActual) => {
      const cabezaActual = serpienteActual[0];


      const nuevaCabeza: Posicion = {
        x: cabezaActual.x + dx,
        y: cabezaActual.y + dy,
      };

      const chocoPared =
        nuevaCabeza.x < 0 ||
        nuevaCabeza.x >= TAMANO ||
        nuevaCabeza.y < 0 ||
        nuevaCabeza.y >= TAMANO;

      const chocoCuerpo = serpienteActual.filter(
        (segmento) => segmento.x === nuevaCabeza.x && segmento.y === nuevaCabeza.y
      ).length > 0;

      if (chocoPared || chocoCuerpo) {
        alert('¡Perdiste! La serpiente chocó.');
        reiniciarJuego();
        return POSICION_INICIAL_SERPIENTE;
      }

      const haComido =
        nuevaCabeza.x === comida.x && nuevaCabeza.y === comida.y;

      if (haComido) {
        const nuevaSerpiente = [nuevaCabeza, ...serpienteActual];
        setComida(generarComida(nuevaSerpiente));
        return nuevaSerpiente;
      }


      return [nuevaCabeza, ...serpienteActual.slice(0, -1)];
    });
  };

  const manejarTecla = (evento: KeyboardEvent<HTMLDivElement>) => {
    if (evento.key === 'ArrowUp') {
      mover(0, -1);
    }
    if (evento.key === 'ArrowDown') {
      mover(0, 1);
    }
    if (evento.key === 'ArrowLeft') {
      mover(-1, 0);
    }
    if (evento.key === 'ArrowRight') {
      mover(1, 0);
    }
  };

  return (
    <div tabIndex={0} onKeyDown={manejarTecla} style={{ outline: 'none' }}>
      <Tablero serpiente={serpiente} comida={comida} />
    </div>
  );
}

export default App;