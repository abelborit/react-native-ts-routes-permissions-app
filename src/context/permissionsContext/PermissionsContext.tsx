/* el context es quien va a exponer los datos a los demás componentes */
import {createContext} from 'react';
import {PermissionsProviderStateInterface} from './PermissionsProvider';

/* aquí es donde se coloca qué es lo que quiero distribuir en el value del Provider, aquí deberían estar todos los métodos, estados, etc... */
interface PermissionsContextProps {
  permissionsNeeded: PermissionsProviderStateInterface; // se puede colocar como está en PermissionsProviderStateInterface directamente por cada permiso que se necesite pero de esta forma es un poco más general ya que aquí estarían todos los permisos que vayamos a usar y nos evitamos hacer refactorizaciones en un futuro por cada permiso que pueda necesitar
  askLocationPermission: () => void; // preguntar si tengo acceso o no
  checkLocationPermission: () => void; // revisar si tengo acceso o no
}

export const PermissionsContext = createContext<PermissionsContextProps>(
  {} as PermissionsContextProps,
);
