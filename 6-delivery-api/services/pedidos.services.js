import PedidosRepository from "../repositories/pedidosRepository.js"

async function criarPedido(pedido) {
    return await PedidosRepository.inserirPedido(pedido)
}

async function getPedido(id) {
    return await PedidosRepository.getPedido(id)
}

async function atualizarPedido(pedido) {
    console.log(pedido)
    return await PedidosRepository.atualizarPedido(pedido)
}

async function deletePedido(id) {
    return await PedidosRepository.deletePedido(id)
}

async function atualizarEntrega(pedido) {
    const objPedido = await PedidosRepository.getPedido(pedido.id)
    objPedido.entregue = pedido.entregue
    return await PedidosRepository.atualizarPedido(objPedido)
}

async function getTotalClienteEntregue(cliente) {
    return await PedidosRepository.getTotalClienteEntregue(cliente)
}

async function totalProduto(produto) {
    return await PedidosRepository.totalProduto(produto)
}
async function maisvendidos() {
    return await PedidosRepository.maisvendidos()
}

export default {
    criarPedido,
    atualizarPedido,
    getPedido,
    deletePedido,
    atualizarEntrega,
    getTotalClienteEntregue,
    totalProduto,
    maisvendidos
}