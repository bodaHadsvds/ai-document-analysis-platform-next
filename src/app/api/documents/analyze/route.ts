import { InferenceClient } from "@huggingface/inference";
import { NextRequest } from "next/server";


export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const { content, task } = await req.json();

    if (!content) return new Response("Missing content", { status: 400 });
    if (!task) return new Response("Missing task type", { status: 400 });

    const client = new InferenceClient(process.env.HUGGINGFACE_API_TOKEN);


    const stream = new ReadableStream({
      async start(controller) {
        const send = (data: any) =>
          controller.enqueue(
            new TextEncoder().encode(`data: ${JSON.stringify(data)}\n\n`)
          );

        try {
          switch (task) {
     
            case "summarization": {
              send({ status: "processing", step: "summarization_start" });
              const result = await client.summarization({
                model: "facebook/bart-large-cnn",
                inputs: content,
              });

              const summary = result.summary_text || "";
              const words = summary.split(" ");
              for (const word of words) {
                send({ task: "summarization", chunk: word });
                await new Promise((r) => setTimeout(r, 80));
              }

              send({
                task: "summarization",
                done: true,
                result: summary,
              });
          break ;
            }

          
            case "sentiment": {
              send({ status: "processing", step: "sentiment_start" });
              const result = await client.textClassification({
                model: "distilbert-base-uncased-finetuned-sst-2-english",
                inputs: content,
              });

              // optional: simulate token streaming for realism
              send({ task: "sentiment", progress: "analyzing" });
              await new Promise((r) => setTimeout(r, 80));

              const sentiment = result?.[0]
                ? {
                    label: result[0].label,
                    score: result[0].score,
                  }
                : null;
                  console.log('sentiment pass')
              send({
                task: "sentiment",
                done: true,
                result: sentiment,
              });
              break;
            }
  
        
            case "ner": {
              send({ status: "processing", step: "ner_start" });
              const result = await client.tokenClassification({
                model: "dslim/bert-base-NER",
                inputs: content,
              });
       
          console.log('ner pass' ,result)
              for (const entity of result) {
                send({
                  task: "ner",
                  entity: {
                    type: entity.entity_group,
                    value: entity.word,
                    score:entity.score
                  },
                });
                console.log('result d', result ,entity)
                await new Promise((r) => setTimeout(r, 80));
              }

              const entities =
                result?.map((e) => ({
                  type: e.entity_group,
                  value: e.word,
                })) || [];
             console.log('result', result)
              send({
                task: "ner",
                done: true,
                result: entities,
              });
              break;
            }

            default:
              send({ status: "error", message: "Invalid task type" });
              break;
          }

          send({ status: "completed" });
          send("[DONE]");
          controller.close();
        } catch (err) {
          console.error(err);
          send({
            status: "error",
            message: "Task failed. Check model or content.",
          });
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  }  catch (error: any) {
  const status = error?.httpResponse?.status || 500;

  switch (status) {
    case 401:
      return new Response("Not authorized", { status: 401 });
    case 429:
      
      return new Response(JSON.stringify({ status: "error", message: "Rate limit, try later" }), { status: 429 });
    case 503:
     
      return new Response(JSON.stringify({ status: "error", message: "Model warming up, retry in 20s" }), { status: 503 });
    default:
      return new Response(JSON.stringify({ status: "error", message: error.message || "Unknown error" }), { status });
  }
}
}
