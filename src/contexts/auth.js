import { createContext, useReducer, useContext } from 'react';
import { SET_AUTH, LOGOUT } from '../actions/auth'
import { authReducer, initialState } from '../reducers/auth'
import jwt_decode from 'jwt-decode'

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

    const getUserInformation = () => ({name: jwt_decode(state.jwt)})

    const logout = () => {
        dispatch({type: LOGOUT})
    }
    const login = ({username, password}) => {
        // Peticion HTTP axios.post ({username, paswword}). El server me devuelve un JWT
        // Una vez se ejecuta el método del login del contexto, éste realiza una peticion http (post) al backend /authentication
        // El backend verifica el usuario password enviados
        // Si el usuario y el password son correcto, el backend crea un JWT (iat, nombre, id)
        // Si los datos son incorrectos → jwt: null
        if(username === "admin" && password === "1234"){
            const { jwt } = {
              ok: true,
              jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkRpZWdvIEdhbmRhcmEiLCJpYXQiOjE1MTYyMzkwMjJ9.kxPsWCLwyxLj5nLbvCKk32THPLDrdVG7rMR1YYlev8M',
            };
            setAuth({ jwt });
            return jwt
        }else{
            return null;
        }
    }

    return (
      <Provider value={{ state, setAuth, logout, login, getUserInformation }}>
        {' '}
        {children}{' '}
      </Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context) throw new Error("useAuth must be wrapped with AuthProvider")
    return context
}
