import api from "../api"


export async function buscaUsuario(nomeUsuario) {
    try {
        const resultado = await api.get(`/users/${nomeUsuario}`);
        console.log(resultado.data)
        return resultado.data;
    } catch (error) {
        console.log(error);
        return {}
    }
}