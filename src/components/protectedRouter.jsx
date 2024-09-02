import React, { useEffect, useState } from "react";
import { useUserAuth } from "./UserAuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRouter = ({ children }) => {
    const { user, setUser, isAuthenticated} = useUserAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            // Tenta recuperar os dados do usuário do localStorage
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        }
        setLoading(false);
    }, [user, setUser]);

    if (loading) {
        return <div>Loading...</div>; // Ou algum tipo de spinner de carregamento
    }

    if (!isAuthenticated && !user) {
        return <Navigate to="/siteTest/login" />;
    }

    return children;
};

export default ProtectedRouter;
