// const fetch = require('node-fetch');

// async function triggerNotification(user) {
//   try {
//     const response = await fetch('https://app-1-git-pkgalishnikova-patch-1-polinas-projects-362e930b.vercel.app', {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         type: "payment-due",
//         payload: {
//           client: 0x4e70118062f53C57a44944b450283480fd5134f6,
//           pay: "100000000000000000", // 0.1 ETH in wei
//           token_id: "123",
//           contract_id: "456",
//           status: "1",
//           donations: "500000000000000000" // 0.5 ETH in wei
//         }
//       }),
//     });

//     const text = await response.text();
//     console.log("Webhook response:", response.status, text);
//   } catch (err) {
//     console.error("Webhook notification failed:", err.message);
//   }
// }

// triggerNotification("0x8064700776446D45cF96E4caf3cFf67075bfC3F7");

const fetch = require('node-fetch');

async function triggerNotification(user) {
  try {
    const response = await fetch('https://app-1-kappa.vercel.app/api/webhook', {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.VERCEL_AUTH_TOKEN}`
      },
      body: JSON.stringify({
        type: "payment-due",
        payload: {
          client: user,
          pay: "100000000000000000",
          token_id: "123",
          contract_id: "456",
          status: "1",
          donations: "500000000000000000"
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("Webhook response:", data);
  } catch (err) {
    console.error("Webhook notification failed:", err);
  }
}

triggerNotification("0x8064700776446D45cF96E4caf3cFf67075bfC3F7");