import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate  } from 'react-router-dom';
import ConstructorPage from '../../pages/constructor';
import ForgotPasswordPage from '../../pages/forgot-password';
import IngredientInfoPage from '../../pages/ingredient-info';
import LoginPage from '../../pages/login';
import NotFoundPage from '../../pages/not-found';
import OrderPage from '../../pages/order';
import ProfilePage from '../../pages/profile';
import RegisterPage from '../../pages/register';
import ResetPasswordPage from '../../pages/reset-password';
import { clearIngredientDetails } from '../../services/actions/ingredient-details';
import { getIngredients } from '../../services/actions/ingredients-data';
import useAuth from '../../utils/use-auth';
import AppHeader from '../app-header/app-header';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { ProtectedRoute } from '../protected-route/protected-route';

export default function App() {
  const dispatch = useDispatch();
  
  useAuth();

  React.useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);
  const [ingredientDetailsModalOpen, setIngredientsDetailsModalOpen] = useState(true);

  const ModalSwitch = () => {
    const location = useLocation();
    const navigate  = useNavigate();
    let background = location.state && (location.state as any).background;

    const handleModalClose = () => {
      dispatch(clearIngredientDetails());
      setIngredientsDetailsModalOpen(false);
      navigate(-1);
    };
  
    return (
      <>
        <AppHeader />
        <Routes location={background || location}>
          <Route path="/" element={<ConstructorPage/>} />
          <Route path="/ingredients/:ingredientId" element={<IngredientInfoPage />} />

          <Route
            path="/profile"
            element={<ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>}
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/login"
            element={<ProtectedRoute onlyNotLoggedAccess>
                <LoginPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={<ProtectedRoute onlyNotLoggedAccess>
              <ForgotPasswordPage />
            </ProtectedRoute>}
          />
          <Route
            path="/reset-password"
            element={<ProtectedRoute onlyNotLoggedAccess>
              <ResetPasswordPage />
            </ProtectedRoute>}
          />
          <Route path={"/order"} element={<OrderPage />} />
          <Route path={"/*"} element={<NotFoundPage />} />
          </Routes>
          
          {background && (
            <Routes>
              <Route
                path="/ingredients/:ingredientId"
                element={ ingredientDetailsModalOpen &&
                  <Modal title="Детали ингредиента" closeHandler={ () => handleModalClose() }>
                    <IngredientDetails />
                  </Modal>
                }
              />
              <Route path="/" element={null} />
            </Routes>
            )}
      </>
    );
  }

  return (
    <Router>
      <ModalSwitch />
    </Router>
  );
}