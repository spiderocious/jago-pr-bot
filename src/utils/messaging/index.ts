/* eslint-disable @typescript-eslint/no-explicit-any */
// Message structure
interface Message<T = any> {
  event: string;
  data: T;
}


// Sender info from Chrome
type MessageSender = chrome.runtime.MessageSender

// Event handler type
type EventHandler<TData = any, TResponse = any> = (
  data: TData,
  sender: MessageSender
) => TResponse | Promise<TResponse>;

/**
 * Send message and wait for response
 */
export async function send<TData = any, TResponse = any>(
  eventName: string,
  eventObject: TData = {} as TData
): Promise<TResponse> {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(
      { event: eventName, data: eventObject } as Message<TData>,
      (response: TResponse) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(response);
        }
      }
    );
  });
}

/**
 * Listen for events in background/side panel
 */
export function on<TData = any, TResponse = any>(
  eventName: string,
  handler: EventHandler<TData, TResponse>
): void {
  chrome.runtime.onMessage.addListener(
    (
      message: Message<TData>,
      sender: MessageSender,
      sendResponse: (response: TResponse) => void
    ) => {
      if (message.event === eventName) {
        const result = handler(message.data, sender);

        if (result instanceof Promise) {
          result.then(sendResponse).catch((error) => {
            console.error(`Error in handler for event "${eventName}":`, error);
            sendResponse(undefined as TResponse);
          });
          return true; // Keep channel open for async
        } else {
          sendResponse(result);
        }
      }
    }
  );
}