import api from "../api";

export async function pegarRepositoriosDoUsuario(id) {
    try {
        console.log()
        const resultado = await api.get(`/users/${id}/repos`);
        return resultado.data;
    } catch (error) {
        console.log(error);
        return []
    }
}

export async function salvarRepositoriosDoUsuario(postId, nome, data, id) {
    try {
        await api.put(`/repos/${id}`, {
            name: nome,
            data: data,
            postId: postId,
            id: id
        });
        return "Sucesso";
    } catch (error) {
        return "erro"
    }
}

export async function buscarRepositoriosDoUsuario(postId, nome) {
    try {
        const resultado = await api.get(`/repos?postId=${postId}&name=${nome}`);
        return resultado.data;
    } catch (error) {
        console.log(error);
        return ""
    }
}

export async function criarRepositoriosDoUsuario(postId, nome, data) {
    try {
        await api.post(`/repos`, {
            name: nome,
            data: data,
            postId: postId
        });
        return "Sucesso";
    } catch (error) {
        return "erro"
    }
}

export async function deletarRepositoriosDoUsuario(id) {
    try {
        await api.delete(`/repos/${id}`);
        return "Sucesso";
    } catch (error) {
        return "erro"
    }
}