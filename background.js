const apiKey = "AIzaSyDIBti7s2WcKH44nfkGuVEu73F_CArtvNE";
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "generateReply") {
    console.log("Received request to generate reply:", request.messages);

    chrome.storage.local.get(
      ["linkedinName", "linkedinGender"],
      async (data) => {
        const myname = data.linkedinName || "Krisha Arya";
        const gender = data.linkedinGender || "female";
        const messages = request.messages.join("\n");

        try {
          let response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: `Your name is ${myname}. You are a professional responding to a LinkedIn message in a natural, engaging, and human-like way. Keep the response concise (1-2 sentences) but varied and contextually appropriate.
                    
                    The conversation format is:  
                    name salutation time  
                    message
                    
                    Messages:\n\n${messages}\n\n
                    Provide only the response text—no greetings, explanations, or extra details. Do not use emojis. Always be professional.`,
                    },
                  ],
                },
              ],
            }),
          });

          let data = await response.json();
          if (data.candidates && data.candidates.length > 0) {
            sendResponse({ reply: data.candidates[0].content.parts[0].text });
          } else {
            console.error("Invalid AI response format:", data);
            sendResponse({ reply: "Sorry, I couldn't generate a response." });
          }
        } catch (error) {
          console.error("Error fetching AI response:", error);
          sendResponse({ reply: "Sorry, I couldn't generate a response." });
        }
      }
    );

    return true; // Required to keep `sendResponse` asynchronous
  }

  if (request.action === "fixGrammar") {
    console.log("Received request to fix grammar:", request.text);

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `You are an expert editor. Fix the following text by improving grammar and clarity without changing meaning.  

                Text:\n\n${request.text}\n\n
                Return only the corrected version—no explanations, no emojis.`,
              },
            ],
          },
        ],
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Fixed Grammar Data:", data);
        sendResponse({ fixedText: data.candidates[0].content.parts[0].text });
      })
      .catch((error) => {
        console.error("Error fixing grammar:", error);
        sendResponse({ fixedText: "Error in grammar correction." });
      });

    return true; // Required for async response
  }
});

// const apiKey = "AIzaSyDIBti7s2WcKH44nfkGuVEu73F_CArtvNE";
// const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.action === "generateReply") {
//     console.log("Received request to generate reply:", request.messages);

//     chrome.storage.local.get(["linkedinName", "linkedinGender"], (data) => {
//       const myname = data.linkedinName ? data.linkedinName : "Krisha Arya";
//       const gender = data.linkedinGender ? data.linkedinGender : "female";
//       console.log(request);
//       console.log(request.messages.join);

//       fetch(url, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           contents: [
//             {
//               parts: [
//                 {
//                   text: `Your name is ${myname}. You are a professional responding to a LinkedIn message in a natural, engaging, and human-like way. Your response should be concise (1-2 sentences) yet varied and contextually appropriate. Adapt your tone based on the message—be conversational, friendly, and relevant. Avoid overly generic or robotic replies.
//                   The conversation messages are in the fomat of :
//                   name solutation time
//                   messages
//                   Here is the messages:\n\n${request.messages.join("\n")}\n\n

//                   Only provide the response text—no greetings, explanations, or additional details. Ensure the reply sounds unique each time rather than a repeated template. Also, you are chatting as ${myname}, so any other name is treated as another person. Reply accordingly. Never say you are a bot; you are human, and your name is ${myname} and my gender is ${gender}. Never use emojis in the response. Always be professional.`,
//                 },
//               ],
//             },
//           ],
//         }),
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           console.log("AI Response Data:", data);
//           sendResponse({ reply: data.candidates[0].content.parts[0].text });
//         })
//         .catch((error) => {
//           console.error("Error fetching AI response:", error);
//           sendResponse({ reply: "Sorry, I couldn't generate a response." });
//         });
//     });

//     return true;
//   }

//   if (request.action === "fixGrammar") {
//     console.log("Received request to fix grammar:", request.text);

//     fetch(url, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         contents: [
//           {
//             parts: [
//               {
//                 text: `You are a professional English writer and editor. Your task is to refine the following text while keeping it professional, natural, and grammatically perfect. Preserve the original meaning but enhance clarity and structure. Do not add extra explanations, just return the corrected version.

//                 Here is the text to fix:\n\n${request.text}\n\n

//                 Only provide the improved version—no greetings, explanations, or additional details. Ensure the text is fluent and professional without any robotic tone. Never use emojis.`,
//               },
//             ],
//           },
//         ],
//       }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Fixed Grammar Data:", data);
//         sendResponse({ fixedText: data.candidates[0].content.parts[0].text });
//       })
//       .catch((error) => {
//         console.error("Error fixing grammar:", error);
//         sendResponse({ fixedText: "Error in grammar correction." });
//       });

//     return true;
//   }
// });
