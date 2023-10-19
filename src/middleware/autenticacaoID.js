const { errosGerais, errosProduto } = require("../constants/erroMensagens");


const verificarID = async (req, res, next) => {
    console.log("Middleware verificarID chamado");

    try {
        const { id } = req.params;
        console.log("ID", id);
        console.log(req.params);


        if(!id){
            console.log("id nao fornecido");
            return res.status(400).json({
                mensagem: errosProduto.idNaoInformado
            })
        }
        
        next();
    } catch (error) {
        console.error("Erro no middleware verificarID:", error); 
            return res.status(500).json({
              mensagem: errosGerais.naoAutorizado,
            });
          
        
    }
    

}


module.exports = { verificarID };