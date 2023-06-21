import RequisicaoIncorreta from "../errors/RequisicaoIncorreta.js";

async function paginar(req, res, next) {
    try {
        let { limite = 5, pagina = 1, ordenacao = "_id:-1" } = req.query

        let [campoOrdenacao, ordem] = ordenacao.split(":");

        limite = parseInt(limite);
        pagina = parseInt(pagina);

        const resultado = req.resultado;

        if (limite > 0 && pagina > 0) {
            const data = await resultado.find()
                .sort({ [campoOrdenacao]: ordem })
                .skip((pagina - 1) * limite)
                .limit(limite);

            res.status(200).json(data);
        } else {
            next(new RequisicaoIncorreta())
        }
    } catch (error) {
        next(error);
    }
}

export default paginar;