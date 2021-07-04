import PedidoService from "../services/pedidos.services.js"

async function criarPedido(req, res, next) {
    try {
        let pedido = req.body
        if (!pedido.cliente || !pedido.produto || pedido.valor == null) {
             throw new Error("Cliente Produto e Valor são obrigatórios!")
        }
        pedido = await PedidoService.criarPedido(pedido)
        res.send(pedido)
    } catch (err) {
        next(err)
    }
}

async function getPedido(req, res, next) {
    try {
        res.send(await PedidoService.getPedido(req.params.id))
    } catch (err) {
        next(err)
    }
}

async function atualizarPedido(req, res, next) {
    try {
        let pedido = req.body
        console.log('p', pedido)
        if (pedido.id == null || !pedido.cliente || !pedido.produto || pedido.valor == null || pedido.entregue == undefined) {
            throw new Error("Cliente Produto e Valor são obrigatórios!")
       }
       res.send(await PedidoService.atualizarPedido(pedido))
    } catch (err) {
        next(err)
    }
}

async function deletePedido(req, res, next) {
    try {
        await PedidoService.deletePedido(req.params.id)
        res.end()
    } catch (err) {
        next(err)
    }
}

async function atualizarEntrega(req, res, next) {
    try {
        const pedido = req.body
        if (!pedido.id || pedido.entregue == null) {
            throw new Error("Id e Entrega são obrigatórios")
        }
        res.send(await PedidoService.atualizarEntrega(pedido))
    } catch (error) {
        
    }
}

async function getTotalClienteEntregue(req, res, next) {
    try {
        const nomeCliente = req.body
        if (!nomeCliente.cliente || nomeCliente.id == null) {
            throw new Error("Nome do Cliente é obrigatório")
        }
        res.send(await PedidoService.getTotalClienteEntregue(nomeCliente))
    } catch (err) {
        next(err)
    }
}

async function totalProduto(req, res, next) {
    try {
        res.send(await PedidoService.totalProduto(req.params.totalProduto))
    } catch (err) {
        next(err)
    }
}

async function maisvendidos(req, res, next) {
    try {
        res.send(await PedidoService.maisvendidos())
    } catch (err) {
        next(err)
    }
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