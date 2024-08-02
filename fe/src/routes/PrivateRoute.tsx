import { Alert } from "antd";
import { type ReactElement } from "react";

interface Props {
    children: ReactElement;
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
    // Replace with your auth condition
    const isAuthenticated = true;
    return isAuthenticated ? (
        children
    ) : (
        <Alert message="Ban khong co quyen truy cap" type="error" showIcon />
    );
};

export default PrivateRoute;
