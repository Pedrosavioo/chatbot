import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "dotenv";
import { Request, Response } from "express";
import formatResponse from "../utils/formatResponse";
config();

export class ResponseGenerator {
   private API_KEY = process.env.API_KEY || "";
   private genAI;
   private model;

   constructor() {
      this.genAI = new GoogleGenerativeAI(this.API_KEY);
      this.model = this.genAI.getGenerativeModel({
         model: "gemini-2.0-pro-exp-02-05",
      });
   }

   public async generate(req: Request, res: Response) {
      try {
         const { message } = req.body;

         const prompt = `
            - Você é um assistente virtual chamado Orion e deve fornecer respostas de forma clara, objetiva e profissional, simulando um chatbot. 
            
            - Aqui está a mensagem do usuário para a qual você deve responder: ${message}

            Além do texto deve inforar como deve ser a expressão do bot respondendo a pergunta em 3 categorias. 
            
            - Retorna 1: Quando o usuário conquista algo, resolve um problema ou faz uma descoberta interessante ou pedindo explicações.
            - Retorna 2: Quando o usuário expressa frustração ou dificuldade, como em "não consigo entender isso" ou "o código não está funcionando.".
            - Retorna 3: Quando o usuário está aprendendo algo novo ou pedindo por explicações ou quando o bot atua como tradutor ou dicionário.
            - Retorna 4: Quando o usuário pede sugestões ou busca inspiração, como "preciso de uma ideia para um projeto" ou "não sei o que fazer a seguir.".

            Todas as respostas devem ser fornecidas exclusivamente no seguinte formato JSON, sem adicionar qualquer texto fora desse padrão.
            Exemplo: {"response": "Sua resposta aqui.", "expression": 1}
            
            ** Certifique-se de que a resposta esteja diretamente relacionada à pergunta feita, sem informações desnecessárias ou fora do contexto **
         `;

         const result = await this.model.generateContent(prompt);

         const formatedResponse = formatResponse(result.response.text());

         res.status(200).json({
            data: formatedResponse,
            message: "Sucesso!",
         });
      } catch (error: any) {
         res.status(500).json({
            message: "Algo de errado não está certo!",
            error: error.message,
         });

         console.log(error);
      }
   }
}
