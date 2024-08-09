import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { Modal, Button, Form, InputGroup, ListGroup, Alert } from 'react-bootstrap';
import Calendar from 'react-calendar';
import Chart from 'chart.js/auto';
import 'react-calendar/dist/Calendar.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [saldoActual, setSaldoActual] = useState(0.0);
  const [gastos, setGastos] = useState([]);
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [usuarios, setUsuarios] = useState({});
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showSaldo, setShowSaldo] = useState(false);
  const [showGastos, setShowGastos] = useState(false);
  const [showCalendario, setShowCalendario] = useState(false);
  const [showGrafico, setShowGrafico] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [showConfigurarPresupuesto, setShowConfigurarPresupuesto] = useState(false);
  const [showGenerarReporte, setShowGenerarReporte] = useState(false);
  const [fechaInicio, setFechaInicio] = useState(new Date());
  const [fechaFin, setFechaFin] = useState(new Date());
  const [descripcion, setDescripcion] = useState('');
  const [costo, setCosto] = useState('');
  const [fechaGasto, setFechaGasto] = useState('');
  const [categoria, setCategoria] = useState('');
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [nuevoUsuario, setNuevoUsuario] = useState('');
  const [nuevaContrasena, setNuevaContrasena] = useState('');

  useEffect(() => {
    // Cargar datos de usuario y gastos al iniciar
    if (usuarioActual) {
      cargarDatos();
    }
  }, [usuarioActual]);

  const guardarDatos = () => {
    if (usuarioActual) {
      const datos = {
        saldoActual,
        gastos: gastos.map(gasto => ({
          descripcion: gasto.descripcion,
          costo: gasto.costo,
          fecha: gasto.fecha.toISOString(),
          categoria: gasto.categoria,
        })),
      };
      localStorage.setItem(`datos_${usuarioActual}`, JSON.stringify(datos));
    }
  };

  const cargarDatos = () => {
    if (usuarioActual) {
      const datos = JSON.parse(localStorage.getItem(`datos_${usuarioActual}`) || '{}');
      setSaldoActual(datos.saldoActual || 0);
      setGastos((datos.gastos || []).map(gasto => ({
        descripcion: gasto.descripcion,
        costo: gasto.costo,
        fecha: new Date(gasto.fecha),
        categoria: gasto.categoria,
      })));
    }
  };

  const registrarUsuario = () => {
    const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios') || '{}');
    if (usuariosGuardados[nuevoUsuario]) {
      alert('El usuario ya existe.');
    } else {
      usuariosGuardados[nuevoUsuario] = nuevaContrasena;
      localStorage.setItem('usuarios', JSON.stringify(usuariosGuardados));
      alert('Usuario registrado con éxito');
      setShowRegister(false);
    }
  };

  const iniciarSesion = () => {
    const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios') || '{}');
    if (usuariosGuardados[usuario] === contrasena) {
      setUsuarioActual(usuario);
      cargarDatos();
      setShowLogin(false);
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };

  const editarSaldo = () => {
    setSaldoActual(parseFloat(prompt('Ingrese el nuevo saldo:')) || saldoActual);
    guardarDatos();
  };

  const registrarGasto = () => {
    const nuevoGasto = {
      descripcion,
      costo: parseFloat(costo),
      fecha: new Date(fechaGasto),
      categoria,
    };
    setSaldoActual(saldoActual - nuevoGasto.costo);
    setGastos([...gastos, nuevoGasto]);
    alert('Gasto registrado con éxito');
    setDescripcion('');
    setCosto('');
    setFechaGasto('');
    setCategoria('');
    guardarDatos();
  };

  const eliminarGasto = (index) => {
    const gastoEliminado = gastos[index];
    setSaldoActual(saldoActual + gastoEliminado.costo);
    setGastos(gastos.filter((_, i) => i !== index));
    alert('Gasto eliminado con éxito');
    guardarDatos();
  };

  const verSaldo = () => {
    alert(`Saldo actual: ${saldoActual.toFixed(2)}`);
  };

  const verGastos = () => {
    alert(gastos.map(gasto => `${gasto.fecha.toLocaleDateString()} - ${gasto.descripcion} - $${gasto.costo} - ${gasto.categoria}`).join('\n'));
  };

  const verCalendario = () => {
    setShowCalendario(true);
  };

  const mostrarGastosDia = () => {
    const gastosDia = gastos.filter(gasto => gasto.fecha.toDateString() === fechaInicio.toDateString());
    alert(gastosDia.length > 0
      ? gastosDia.map(gasto => `${gasto.descripcion} - $${gasto.costo} - ${gasto.categoria}`).join('\n')
      : 'No hay gastos registrados en esta fecha'
    );
  };

  const mostrarGraficoCategorias = () => {
    const categorias = gastos.reduce((acc, gasto) => {
      acc[gasto.categoria] = (acc[gasto.categoria] || 0) + gasto.costo;
      return acc;
    }, {});

    const ctx = document.getElementById('graficoCategorias').getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: Object.keys(categorias),
        datasets: [{
          data: Object.values(categorias),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF9F40', '#C9CBCF', '#FF6F61', '#8E44AD'],
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed !== null) {
                  label += `${context.parsed.toFixed(2)} USD`;
                }
                return label;
              }
            }
          }
        }
      },
    });
    setShowGrafico(true);
  };

  const resetearPresupuesto = () => {
    setSaldoActual(0.0);
    setGastos([]);
    guardarDatos();
    alert('Presupuesto reseteado con éxito');
  };

  const configurarPresupuesto = () => {
    const saldoInicial = parseFloat(prompt('Ingrese el saldo inicial:'));
    if (!isNaN(saldoInicial)) {
      setSaldoActual(saldoInicial);
      guardarDatos();
      alert('Presupuesto configurado con éxito');
    } else {
      alert('Ingrese un número válido');
    }
  };

  const generarReporte = () => {
    const gastosReporte = gastos.filter(gasto => gasto.fecha >= fechaInicio && gasto.fecha <= fechaFin);
    if (gastosReporte.length > 0) {
      const reporte = gastosReporte.map(gasto => `${gasto.fecha.toLocaleDateString()} - ${gasto.descripcion} - $${gasto.costo} - ${gasto.categoria}`).join('\n');
      const blob = new Blob([reporte], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `reporte_${fechaInicio.toISOString().slice(0,10)}_${fechaFin.toISOString().slice(0,10)}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      alert('Reporte generado con éxito');
    } else {
      alert('No hay gastos registrados en el rango de fechas seleccionado');
    }
  };

  return (
    <div className="container">
      <h1 className="my-4">Gestor de Dinero y Gastos</h1>

      {!usuarioActual ? (
        <>
          <Button variant="primary" onClick={() => setShowLogin(true)}>Iniciar Sesión</Button>
          <Button variant="secondary" onClick={() => setShowRegister(true)}>Registrar Usuario</Button>
        </>
      ) : (
        <>
          <Button variant="info" onClick={verSaldo}>Ver Saldo</Button>
          <Button variant="info" onClick={() => setShowGastos(true)}>Ver Gastos</Button>
          <Button variant="info" onClick={verCalendario}>Calendario de Gastos</Button>
          <Button variant="info" onClick={mostrarGraficoCategorias}>Mostrar Gráfico de Categorías</Button>
          <Button variant="warning" onClick={() => setShowConfigurarPresupuesto(true)}>Configurar Presupuesto</Button>
          <Button variant="danger" onClick={() => setShowReset(true)}>Resetear Presupuesto</Button>
          <Button variant="success" onClick={() => setShowGenerarReporte(true)}>Generar Reporte</Button>
        </>
      )}

      <Modal show={showLogin} onHide={() => setShowLogin(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Iniciar Sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formUsuario">
              <Form.Label>Usuario</Form.Label>
              <Form.Control type="text" placeholder="Ingrese su usuario" value={usuario} onChange={e => setUsuario(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formContrasena">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" placeholder="Ingrese su contraseña" value={contrasena} onChange={e => setContrasena(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLogin(false)}>Cerrar</Button>
          <Button variant="primary" onClick={iniciarSesion}>Iniciar Sesión</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showRegister} onHide={() => setShowRegister(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Registrar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNuevoUsuario">
              <Form.Label>Nuevo Usuario</Form.Label>
              <Form.Control type="text" placeholder="Ingrese nuevo usuario" value={nuevoUsuario} onChange={e => setNuevoUsuario(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formNuevaContrasena">
              <Form.Label>Nueva Contraseña</Form.Label>
              <Form.Control type="password" placeholder="Ingrese nueva contraseña" value={nuevaContrasena} onChange={e => setNuevaContrasena(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRegister(false)}>Cerrar</Button>
          <Button variant="primary" onClick={registrarUsuario}>Registrar</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showGastos} onHide={() => setShowGastos(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Gastos Registrados</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {gastos.map((gasto, index) => (
              <ListGroup.Item key={index}>
                {gasto.fecha.toLocaleDateString()} - {gasto.descripcion} - ${gasto.costo} - {gasto.categoria}
                <Button variant="danger" className="float-end" onClick={() => eliminarGasto(index)}>Eliminar</Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowGastos(false)}>Cerrar</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showCalendario} onHide={() => setShowCalendario(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Calendario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Calendar
            onChange={setFechaInicio}
            value={fechaInicio}
            onClickDay={mostrarGastosDia}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCalendario(false)}>Cerrar</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showGrafico} onHide={() => setShowGrafico(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Gráfico de Categorías</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <canvas id="graficoCategorias"></canvas>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowGrafico(false)}>Cerrar</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showConfigurarPresupuesto} onHide={() => setShowConfigurarPresupuesto(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Configurar Presupuesto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button variant="primary" onClick={configurarPresupuesto}>Configurar Saldo</Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfigurarPresupuesto(false)}>Cerrar</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showReset} onHide={() => setShowReset(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Resetear Presupuesto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="warning">¿Está seguro de que desea resetear el presupuesto?</Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowReset(false)}>Cancelar</Button>
          <Button variant="danger" onClick={resetearPresupuesto}>Resetear</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showGenerarReporte} onHide={() => setShowGenerarReporte(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Generar Reporte</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFechaInicio">
              <Form.Label>Fecha Inicio</Form.Label>
              <Form.Control type="date" value={fechaInicio.toISOString().split('T')[0]} onChange={e => setFechaInicio(new Date(e.target.value))} />
            </Form.Group>
            <Form.Group controlId="formFechaFin">
              <Form.Label>Fecha Fin</Form.Label>
              <Form.Control type="date" value={fechaFin.toISOString().split('T')[0]} onChange={e => setFechaFin(new Date(e.target.value))} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowGenerarReporte(false)}>Cerrar</Button>
          <Button variant="primary" onClick={generarReporte}>Generar Reporte</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

render(<App />, document.getElementById('root'));
