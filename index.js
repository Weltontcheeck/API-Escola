// (Versão Completa com POST, GET, PUT e DELETE)

const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para processar JSON no corpo das requisições
app.use(express.json());

// Armazenamento em memória (simulando um banco de dados simples)
let escolas = [];
let proximoId = 1;

// Função utilitária para encontrar o índice de uma escola
const encontrarIndice = (id) => escolas.findIndex(e => e.id === parseInt(id));

/*
 * ROTAS DE CRIAÇÃO E LEITURA (POST e GET) 
 */

// POST /escolas: Cadastra uma nova escola.
app.post('/escolas', (req, res) => {
    const { nome, endereco, telefone } = req.body;
    if (!nome || !endereco) {
        return res.status(400).json({ erro: 'Nome e endereço são obrigatórios para o cadastro.' });
    }
    const novaEscola = { id: proximoId++, nome, endereco, telefone: telefone || 'Não informado', criadoEm: new Date().toISOString() };
    escolas.push(novaEscola);
    res.status(201).json(novaEscola);
});

// GET /escolas: Lista todas as escolas.
app.get('/escolas', (req, res) => {
    res.status(200).json(escolas);
});

// GET /escolas/:id: Busca uma escola específica.
app.get('/escolas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const escola = escolas.find(e => e.id === id);
    if (!escola) {
        return res.status(404).json({ erro: `Escola com ID ${id} não encontrada.` });
    }
    res.status(200).json(escola);
});

/**
 * Rota PUT /escolas/:id
 * Atualiza todos os dados de uma escola existente.
 */
app.put('/escolas/:id', (req, res) => {
    const id = req.params.id;
    const index = encontrarIndice(id);

    if (index === -1) {
        return res.status(404).json({ erro: `Escola com ID ${id} não encontrada para atualização.` });
    }

    const { nome, endereco, telefone } = req.body;

    // A validação para PUT geralmente exige que todos os campos obrigatórios estejam presentes.
    if (!nome || !endereco) {
        return res.status(400).json({ erro: 'Nome e endereço são obrigatórios para a atualização completa.' });
    }

    const escolaAtualizada = {
        id: parseInt(id),
        nome,
        endereco,
        telefone: telefone || 'Não informado',
        criadoEm: escolas[index].criadoEm,
        atualizadoEm: new Date().toISOString() // Adiciona timestamp de atualização
    };

    escolas[index] = escolaAtualizada;

    res.status(200).json(escolaAtualizada);
});

/**
 * Rota DELETE /escolas/:id
 * Remove uma escola pelo ID.
 */
app.delete('/escolas/:id', (req, res) => {
    const id = req.params.id;
    const index = encontrarIndice(id);

    if (index === -1) {
        // Para DELETE, é comum retornar 204 ou 404. Usaremos 404 para ser mais informativo.
        return res.status(404).json({ erro: `Escola com ID ${id} não encontrada para remoção.` });
    }

    // Remove a escola do array
    escolas.splice(index, 1);

    // Retorna 204 No Content (padrão para sucesso em DELETE que não retorna corpo)
    res.status(204).send();
});


// Inicializa o servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    console.log(`Rotas Adicionadas: PUT /escolas/:id e DELETE /escolas/:id`);
});