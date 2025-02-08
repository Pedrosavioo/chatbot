export default function formatResponse(response: string) {
   let res = response;
   // Quebra de linha
   res = res.replace(/\\n/g, "<br>");

   // Aspas duplas
   res = res.replace(/\\"/g, '"');

   // Aspas simples
   res = res.replace(/\\'/g, "'");

   // Barra invertida
   res = res.replace(/\\\\/g, "\\");

   // 
   res = res.replace(/```json|```/g, "").trim();

   return JSON.parse(res);
}
