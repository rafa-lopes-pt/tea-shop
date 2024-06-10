import { useLocation, useNavigate } from "react-router-dom";
import Button from "../buttons/Button";

interface NavLinkProps {
    action?: Function,
    to?: string,
    children: string,
    onDismissOverlay?: Function,
    indicateRoute?: boolean
}

export default function NavLink({ action, to, children, onDismissOverlay, indicateRoute = true }: NavLinkProps) {

    const { pathname } = useLocation();
    const navigate = useNavigate();
    const isActive = (path?: string) =>
        pathname === `/${path === "/" ? "" : path}`;

    return (
        <li
            className="main-navbar__item"
        >
            <Button
                onClick={() => {
                    action && action();
                    to && navigate(to);
                    onDismissOverlay && onDismissOverlay();
                }}
                variant={indicateRoute && isActive(to) ? "primary" : "outlined"}>
                {children}
            </Button>
        </li>)
}