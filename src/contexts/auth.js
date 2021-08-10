import { createContext, useReducer, useContext } from 'react';
import { SET_AUTH, LOGOUT } from '../actions/auth'
import { authReducer, initialState } from '../reducers/auth'

// 1) Creo/defino el contexto
export const AuthContext = createContext();
// 2) Destructuro Provider de AuthContext
const {Provider} = AuthContext;

// Defino el AuthProvider pasandole los children (Routes, por ejemplo)

export const AuthProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    const setAuth = ({ jwt }) => {
        dispatch({type: SET_AUTH, payload: {jwt} })
    }

    const logout = () => {
        dispatch({type: LOGOUT})
    }
    const login = ({username, password}) => {
        // Peticion HTTP axios.post ({username, paswword}). El server me devuelve un JWT
        // Una vez se ejecuta el método del login del contexto, éste realiza una peticion http (post) al backend /authentication
        // El backend verifica el usuario password enviados
        // Si el usuario y el password son correcto, el backend crea un JWT (iat, nombre, id)
        // Si los datos son incorrectos → jwt: null
         
        const {jwt} = {ok:true, jwt: "el_token_jaskldasd"}
        setAuth({ jwt })
        return jwt;
    }

    return (
      <Provider value={{ state, setAuth, logout, login }}>
        {' '}
        {children}{' '}
      </Provider>
    );
}
export const useAuth = () => {

}