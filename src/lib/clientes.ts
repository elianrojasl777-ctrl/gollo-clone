// Registro de clientes del proyecto académico.
// Los datos se guardan en el navegador (localStorage) y se envían por correo.
// La tarjeta es siempre un número de prueba de la lista blanca de lib/tarjetas.

export interface Cliente {
  nombre: string;
  telefono: string;
  correo: string;
  direccion: string;
  tarjeta: string;
  pagoNumero?: string;
  pagoVence?: string;
  pagoCvv?: string;
  pagoMarca?: string;
  fecha: string;
}

const CLIENTES_KEY = "gollo-demo-clientes";
const REGISTRADO_KEY = "gollo-demo-registrado";
const CHANGE_EVENT = "gollo-clientes-change";

function read(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function write(key: string, value: string | null) {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch {
    // Sin almacenamiento (modo privado, bloqueado): el registro dura solo esta visita.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function parseClientes(raw: string | null): Cliente[] {
  if (!raw) return [];
  try {
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export function isRegistered(): boolean {
  return read(REGISTRADO_KEY) === "1";
}

export function saveCliente(cliente: Omit<Cliente, "fecha">) {
  const clientes = parseClientes(read(CLIENTES_KEY));
  clientes.push({ ...cliente, fecha: new Date().toISOString() });
  write(CLIENTES_KEY, JSON.stringify(clientes));
  write(REGISTRADO_KEY, "1");
}

export function clearClientes() {
  write(CLIENTES_KEY, null);
  write(REGISTRADO_KEY, null);
}

// Para useSyncExternalStore: avisa cuando cambian los clientes (en esta pestaña o en otra).
export function subscribeClientes(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function getClientesSnapshot(): string | null {
  return read(CLIENTES_KEY);
}
