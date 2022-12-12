import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate  } from 'react-router-dom';
import ConstructorPage from '../../pages/constructor';
import FeedPage from '../../pages/feed';
import FeedDetailsPage from '../../pages/feed-details';
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
import { useAppDispatch } from '../../services/hooks';
import useAuth from '../../utils/use-auth';
import AppHeader from '../app-header/app-header';
import { FeedOrderDetails } from '../feed/feed-order-details/feed-order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { ProtectedRoute } from '../protected-route/protected-route';

export default function App() {
  const dispatch = useAppDispatch();
  
  useAuth();

  React.useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const ModalSwitch = () => {
    const location = useLocation();
    const navigate  = useNavigate();
    const background = location.state && (location.state as any).background;

    const handleModalClose = () => {
      dispatch(clearIngredientDetails());
      setIsModalOpen(false);
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
          <Route path={"/feed"} element={<FeedPage />} />
          <Route path={"/feed/:id"} element={<FeedDetailsPage />} />
          <Route path={"/profile/orders/:id"} element={<FeedDetailsPage />} />
          <Route path={"/profile/orders"} element={
            <ProtectedRoute>
              <OrderPage />
            </ProtectedRoute>
          } />
          <Route path={"/*"} element={<NotFoundPage />} />
          </Routes>
          
          {background && (
            
            <Routes>
              <Route
                path="/ingredients/:ingredientId"
                element={ isModalOpen &&
                  <Modal title="Детали ингредиента" closeHandler={ () => handleModalClose() }>
                    <IngredientDetails />
                  </Modal>
                }
              />
              <Route
                path="/profile/orders/:id"
                element={ 
                  <Modal title={ (location.state as any).oderNum ?? ""} closeHandler={ () => handleModalClose() }>
                    <FeedOrderDetails />
                  </Modal>
                }
              />
              <Route path="/" element={null} />
              <Route
                path="/feed/:id"
                element={ 
                  <Modal title={ (location.state as any).oderNum ?? ""} closeHandler={ () => handleModalClose() }>
                    <FeedOrderDetails />
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