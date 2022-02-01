import Home from "./components/Homepage/Home";
import Login from "./components/Homepage/Login";
import NotFound from "./components/Template/NotFound";
import Usuarios from "./components/Admin/Usuarios/Usuarios";
import Catalogos from "./components/Catalogos/Catalogos";
import Permisos from "./components/Admin/Permisos/Permisos";
import DepartamentoEmpresa from "./components/DepartamentoEmpresa/DepartamentoEmpresa";

export const RoutesData = [
    {exact: true, path: '/', element: Home},
    {exact: true, path: '/admin/permisos', element: Permisos},
    {exact: true, path: '/admin/usuarios', element: Usuarios},
    {exact: true, path: '/catalogos/:key', element: Catalogos},
    {exact: true, path: '/home', element: Home},
    {exact: true, path: '/login', element: Login},
    {exact: true, path: '/departamentoEmpresa', element: DepartamentoEmpresa},
    {path: '*', element: NotFound}
];
