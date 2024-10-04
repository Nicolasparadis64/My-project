import React from 'react';
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Importer Navigate
import { loginUser } from './services/UserServices'; // Assurez-vous que ce chemin est correct
import RegisterPage from './pages/auth/RegisterPage';

interface IAppProps {}

interface IAppState {
  loading: boolean;
  isLogged: boolean;
  urn: string;
}

class App extends React.Component<IAppProps, IAppState> {
  timeoutids: NodeJS.Timeout[] = [];

  constructor(props: IAppProps) {
    super(props);
    this.state = {
      loading: true,
      isLogged: false,
      urn: '',
    };
  }

  componentDidMount() {
    // Vérifier si l'utilisateur est déjà connecté (vérifier le token)
    const token = localStorage.getItem('token');
    if (token) {
      this.setState({ isLogged: true, loading: false });
    } else {
      this.setState({ loading: false });
    }
  }

  handleLogin = async (email: string, password: string) => {
    this.setState({ loading: true });
    try {
      const data = await loginUser(email, password);
      if (data.token) {
        localStorage.setItem('token', data.token);
        this.setState({ isLogged: true, loading: false });
      }
    } catch (error) {
      console.error('Login error:', error);
      this.setState({ loading: false });
    }
  };

  // handleRegister = async (username: string, email: string, password: string) => {
  //   this.setState({loading: true});
  //   try {
  //     const data = await RegisterPage({username, email, password});
  //     if (data.token) {
  //       localStorage.setItem('token', data.token);
  //       this.setState({ isLogged: true, loading: false });
  //     }
  //   } catch (error) {
  //     console.error('Register error:', error);
  //     this.setState({ loading: false });
  //   }
  // }

  handleLogout = () => {
    localStorage.removeItem('token');
    this.setState({ isLogged: false });
  };

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }

    return (
      <Router>
        <Routes>
          {/* Si l'utilisateur n'est pas connecté, rediriger vers /login */}
          {!this.state.isLogged ? (
            <>
              {/* Redirection vers /login par défaut */}
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<LoginPage onLogin={this.handleLogin} />} />
              <Route path="/register" element={<RegisterPage />} />
            </>
          ) : (
            <>
              {/* Une fois connecté, accès à la HomePage */}
              <Route path="/" element={<HomePage onLogout={this.handleLogout} />} />
              {/* Si l'utilisateur essaie d'accéder à /login alors qu'il est connecté, rediriger vers / */}
              <Route path="/login" element={<Navigate to="/" />} />
            </>
          )}
          {/* Route par défaut pour gérer les pages non trouvées */}
          <Route path="*" element={<div>Page non trouvée</div>} />
        </Routes>
      </Router>
    );
  }
}

export default App;
