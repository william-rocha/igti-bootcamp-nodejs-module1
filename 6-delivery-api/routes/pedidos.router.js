import express from "express"
import pedidosController from "../controllers/pedidos.controller.js"
const router = express.Router()

router.get("/totalClienteEntregue", pedidosController.getTotalClienteEntregue)

router.get("/maisvendidos", pedidosController.maisvendidos)

router.get("/:totalProduto", pedidosController.totalProduto)

router.put("/atualizarPedido", pedidosController.atualizarPedido)

router.patch("/atualizarEntregue", pedidosController.atualizarEntrega)

router.delete("/:id", pedidosController.deletePedido)

router.get("/:id", pedidosController.getPedido)

router.post("/", pedidosController.criarPedido)


router.use((err, req, res, next) => {
    res.status(400).send({ error: err.message })
})


export default router