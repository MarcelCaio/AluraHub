import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, TextInput } from 'react-native';
import estilos from './estilos';

import { pegarRepositoriosDoUsuario } from '../../servicos/requisicoes/repositorios';
import { buscarRepositoriosDoUsuario } from '../../servicos/requisicoes/repositorios';
import { useIsFocused } from '@react-navigation/native';

export default function Repositorios({ route, navigation }) {
    const [repo, setRepo] = useState([]);
    const estaNaTela = useIsFocused();
    const [nome, setNome] = useState();

    useEffect(() => {
        console.log(`aqui está o resultado ${route.params.user.login}`);
        const loadData = async () => {
            const resultado = await pegarRepositoriosDoUsuario(route.params.user.login)
            setRepo(resultado);
        };
        loadData();
    }, [estaNaTela])

    async function busca(nome) {
        const retorno = await buscarRepositoriosDoUsuario(route.params.id, nome);

        console.log(nome)
        console.log(retorno)



        if (retorno !== "") {
            setRepo(retorno);
        }

    }

    return (
        <View style={estilos.container}>
            <Text style={estilos.repositoriosTexto}>{repo.length} repositórios criados</Text>
            <TextInput
                placeholder="Busque por um repositório"
                autoCapitalize="none"
                value={nome}
                onChangeText={(texto) => {
                    setNome(texto);
                    busca(texto)
                }}
            />
            <TouchableOpacity
                style={estilos.botao}
                onPress={() => navigation.navigate('CriarRepositorio', { id: route.params.id })}
            >
                <Text style={estilos.textoBotao}>Adicionar novo repositório</Text>
            </TouchableOpacity>

            <FlatList
                data={repo}
                style={{ width: '100%' }}
                keyExtractor={repo => repo.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={estilos.repositorio}
                        onPress={() => navigation.navigate("InfoRepositorio", { item })}>
                        <Text style={estilos.repositorioNome}>{item.name}</Text>
                        <Text style={estilos.repositorioData}>Atualizado em {item.data}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}
