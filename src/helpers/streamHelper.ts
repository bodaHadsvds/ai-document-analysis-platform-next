export const createStream = () => {
  const encoder = new TextEncoder();
  let controllerRef: ReadableStreamDefaultController<any>;

  const stream = new ReadableStream({
    start(controller) {
      controllerRef = controller;
    },
  });

  const send = (data: any) =>
    controllerRef.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));

  const close = () => controllerRef.close();

  return { stream, send, close };
};
