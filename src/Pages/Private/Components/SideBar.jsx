import { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadUser, clearUser } from "@Slice";
import { UserProfile as UserProfileIcon } from "@Assets";
import { UserProfile } from "./UserProfile";
import { NavItem } from "./NavItem";
import LogoutIcon from "./LogoutIcon";
import HomeIcon from "./HomeIcon";
import { HamburgerIcon } from "./HamburgerIcon";
import { HistorialShipmentIcon } from "./HistorialShipmentIcon";
import { ManageShipmentsIcon } from "./ManageShipmentsIcon";
import { ShipmentIcon } from "@Pages";

const navigation = [
  {
    id: "home",
    label: "Inicio",
    icon: <HomeIcon />,
    link: "/tablero/homepage",
  },

  {
    id: "shipments",
    label: "Solicitar envio (cliente)",
    icon: <ShipmentIcon />,
    link: "/tablero/sendshipment",
  },
  {
    id: "historialShipments",
    label: "Historial de envios (cliente)",
    icon: <HistorialShipmentIcon />,
    link: "/tablero/historialshipment",
  },
  {
    id: "management",
    label: "Gestión de envios (Administrador)",
    icon: <ManageShipmentsIcon />,
    link: "/tablero/manageshipment",
  },
  {
    id: "driver",
    label: "Gestion de viajes (Conductor)",
    icon: <HistorialShipmentIcon />,
    link: "/tablero/managedriver",
  },
];

const SideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeItem, setActiveItem] = useState(() => {
    return localStorage.getItem("activeItem") || "home";
  });
  const email = useSelector((state) => state.user?.correo);
  const rol = useSelector((state) => state.user?.rol);
  const id_rol = useSelector((state) => state.user?.id_rol);
 
  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    if (!email || !rol) {
      dispatch(loadUser());
    }
  }, [dispatch, email, rol]);

  useEffect(() => {
    const currentPath = location.pathname;
    const activeNavItem = navigation.find((item) =>
      currentPath.includes(item.link)
    );
    if (activeNavItem) {
      setActiveItem(activeNavItem.id);
    }
  }, [location]);

  useEffect(() => {
    localStorage.setItem("activeItem", activeItem);
  }, [activeItem]);
  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/", { replace: true });
  };

  const filteredNavigation = useMemo(() => {
    if (id_rol === 4) {
      // Super: acceso a todos
      return navigation;
    }
    // Siempre incluir "home"
    const base = navigation.filter((item) => item.id === "home");
    if (id_rol === 1) {
      // Administrador
      return [
        ...base,
        ...navigation.filter((item) => item.id === "management"),
      ];
    }
    if (id_rol === 2) {
      // Cliente
      return [
        ...base,
        ...navigation.filter(
          (item) => item.id === "shipments" || item.id === "historialShipments"
        ),
      ];
    }
    if (id_rol === 3) {
      // Conductor
      return [...base, ...navigation.filter((item) => item.id === "driver")];
    }
    // Si no hay rol válido, solo home
    return base;
  }, [id_rol]);


  return (
    <div
      className={`sticky top-0 left-0 h-screen ${
        isCollapsed ? "w-[60px]" : "w-[218px]"
      } bg-white shadow-lg transition-all duration-300 ease-in-out`}
    >
      <div className="flex flex-col h-full">
        {/* Botón de menú hamburguesa */}
        <button
          className={`p-2 focus:outline-none transition-transform duration-300 ease-in-out mt-2 ${
            isCollapsed ? "rotate-90 self-center" : "rotate-0 mx-2"
          }`}
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label="Toggle Sidebar"
        >
          <HamburgerIcon />
        </button>

        {/* User Profile Section */}
        {!isCollapsed && (
          <div className="pt-5">
            <UserProfile avatar={UserProfileIcon} role={rol} email={email} />
          </div>
        )}

        <div className="h-px bg-[#F2F2F1] my-5" />

        {/* Navigation Items */}
        <nav className="flex-1 focus:outline-none">
          {filteredNavigation.map((item) => (
            <NavItem
              key={item.id}
              icon={item.icon}
              aria-label={item.label}
              label={!isCollapsed ? item.label : null} // Ocultar label si está plegado
              isActive={activeItem === item.id}
              link={item.link}
              onClick={() => setActiveItem(item.id)}
            />
          ))}
        </nav>

        <div className="h-px bg-[#F2F2F1]" />

        {/* Logout Section */}
        <div className="mt-auto p-4">
          <button
            className={`w-full py-2 text-left ${
              isCollapsed ? "justify-center" : "justify-start px-4"
            } text-main hover:bg-[#f2f2f1] focus:outline-none flex items-center gap-2 transition-all duration-300 ease-in-out`}
            onClick={handleLogout}
            aria-label="Close session"
          >
            <LogoutIcon />
            {!isCollapsed && (
              <span className="text-13 font-montserrat font-bold">
                Cerrar sesión
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
