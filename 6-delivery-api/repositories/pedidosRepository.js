import { promises as fs } from "fs"

const { writeFile, readFile } = fs

async function inserirPedido(pedido) {
    const data = JSON.parse(await readFile(global.fileName))
    pedido = {id: data.nextId++, cliente: pedido.cliente, produto: pedido.produto, valor: pedido.valor, entregue: false, timestamp: new Date()}
    data.pedidos.push(pedido)
    await writeFile(global.fileName, JSON.stringify(data, null, 2))
    return pedido
}

async function getPedido(id) {
    const data = JSON.parse(await readFile(global.fileName));
    const pedido = data.pedidos.find(pedido => pedido.id === parseInt(id))
    if (pedido) {
        return pedido
    }
    throw new Error("Pedido não encontrado.")
}

async function atualizarPedido(pedido) {
    const data = JSON.parse(await readFile(global.fileName))
    const index = data.pedidos.findIndex(p => p.id === pedido.id)
    // VALIDAÇÃO para ID que não existem
    if (index === -1) {
        throw new Error("Pedido não encontrado.")
    }
    data.pedidos[index] = Object.assign(data.pedidos[index], pedido);
    await writeFile(global.fileName, JSON.stringify(data, null, 2))
    return data.pedidos[index]
}

async function deletePedido(id) {
    let data = JSON.parse(await readFile(global.fileName))
    data.pedidos = data.pedidos.filter(pedido => pedido.id !== parseInt(id))
    await writeFile(global.fileName, JSON.stringify(data, null, 2))
}

async function getTotalClienteEntregue(nome) {
    let data = JSON.parse(await readFile(global.fileName))
   
    const result = data.pedidos
    .filter(p => p.cliente && p.cliente.toUpperCase() === nome.cliente.toUpperCase() && p.entregue === true)
    .map(p => p.valor)
    .reduce((prev, curr) => prev + curr, 0)
    return {result}
    // return nome.cliente.toUpperCase()
}

async function totalProduto(produto) {
    let data = JSON.parse(await readFile(global.fileName))
    const result = data.pedidos
    .filter(p => p.produto && p.produto.toUpperCase() === produto.toUpperCase() && p.entregue === true)
    .map(p => p.valor)
    .reduce((prev, curr) => prev + curr, 0)
    return {result}
}

async function maisvendidos() {
    let data = JSON.parse(await readFile(global.fileName))
    let lista = []
    data.pedidos.filter(p => p.entregue).forEach(p => {
        const index = lista.findIndex(it => it.produto === p.produto)
        if (index === -1) {
            lista.push({ produto: p.produto, quantidade: 1 })
        } else {
            lista[index].quantidade++
        }
    });
 
    lista.sort((a, b) => b.quantidade - a.quantidade)
    return lista.map(p => `${p.produto} - ${p.quantidade}`)
}

export default {
    inserirPedido,
    getPedido,
    atualizarPedido,
    deletePedido,
    getTotalClienteEntregue,
    totalProduto,
    maisvendidos
}