import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Link,
  Box,
  Avatar,
} from "@mui/material";
import { Home, Search, Settings, ShoppingCart, AccountCircle } from "@mui/icons-material";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import UserMenu from "./UserMenu"; // Asegúrate de que la ruta sea correcta
import "../styles.css"; // Importa los estilos globales

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  const auth = getAuth();
  const db = getFirestore();
  const navigate = useNavigate();

  // Autenticación y rol de usuario
  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const userRef = doc(db, "userProfiles", currentUser.uid);
        getDoc(userRef)
          .then((userDoc) => {
            if (userDoc.exists()) {
              setUser({ ...currentUser, ...userDoc.data() });
            }
          })
          .catch((error) => console.error("Error obteniendo datos del usuario:", error));
      }
    });

    return () => unsubscribeAuth();
  }, [auth, db]);

  // Contador del carrito
  useEffect(() => {
    if (user) {
      const cartRef = doc(db, "carts", user.uid);
      const unsubscribeCart = onSnapshot(cartRef, (doc) => {
        if (doc.exists()) {
          const items = doc.data().items;
          const count = items.reduce((total, item) => total + item.quantity, 0);
          setCartCount(count);
        }
      });

      return () => unsubscribeCart();
    }
  }, [user, db]);

  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
    navigate("/");
  };

  return (
    <AppBar position="fixed" style={{ backgroundColor: "#232f3e" }}>
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo y Nombre */}
        <Box display="flex" alignItems="center">
          <Link href="/" style={{ display: "flex", alignItems: "center" }}>
            <Avatar src="/images/logo.png" alt="QuickVentory" style={{ marginRight: 10 }} />
            <Typography variant="h6" style={{ fontWeight: "bold", color: "white" }}>
              QuickVentory
            </Typography>
          </Link>
        </Box>

        {/* Botones de navegación */}
        <Box display="flex" alignItems="center" gap="15px">
          <IconButton color="inherit" onClick={() => navigate("/")}>
            <Home />
          </IconButton>
          <IconButton color="inherit" onClick={() => navigate("/search")}>
            <Search />
          </IconButton>
          {/* Ícono del carrito con contador */}
          <IconButton color="inherit" onClick={() => navigate("/cart")}>
            <Badge
              badgeContent={cartCount}
              color="error"
              showZero
              sx={{
                "& .MuiBadge-badge": {
                  fontSize: "12px",
                  minWidth: "16px",
                  height: "16px",
                },
              }}
            >
              <ShoppingCart />
            </Badge>
          </IconButton>
          {/* Menú de usuario */}
          <UserMenu user={user} onSignOut={handleSignOut} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;