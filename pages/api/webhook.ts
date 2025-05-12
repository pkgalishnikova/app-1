// import type { NextApiRequest, NextApiResponse } from 'next'

// // In-memory store for notifications
// const notifications: any[] = [];

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {

//   if (req.method === "POST") {
//     const { type, payload } = req.body;

//     if (type === 'payment-due') {
//       const newNotification = {
//         id: `notif-${Date.now()}`,
//         user: payload.client.toLowerCase(),
//         type: 'payment-due',
//         message: `Payment due for Charity NFT ${payload.token_id}`,
//         data: {
//           amount: payload.pay,
//           tokenId: payload.token_id,
//           contractId: payload.contract_id,
//           status: payload.status,
//           donations: payload.donations,
//           name: `Charity NFT #${payload.token_id}`
//         },
//         timestamp: Date.now(),
//         read: false
//       };
//       notifications.push(newNotification);
//       return res.status(200).json({ success: true });
//     }

//     return res.status(400).json({ error: "Invalid notification type" });
//   }


//   if (req.method === "GET") {
//     const { user } = req.query;
    
//     if (!user) {
//       return res.status(400).json({ error: "User address required" });
//     }

//     const userNotifications = notifications.filter(
//       n => n.user.toLowerCase() === user.toString().toLowerCase()
//     );

//     return res.status(200).json({ notifications: userNotifications });
//   }

//   if (req.method === "PUT") {
//     return res.status(200).json({ success: true });
//   }

//   if (req.method === "OPTIONS" && process.env.NODE_ENV === 'development') {
//     notifications.push({
//       id: `test-notif-${Date.now()}`,
//       user: req.query.user?.toString().toLowerCase() || '0x0000000000000000000000000000000000000000',
//       type: 'payment-due',
//       message: 'Test payment due for subscription',
//       data: {
//         amount: '0.1',
//         tokenId: '123',
//         contractId: '456'
//       },
//       timestamp: Date.now(),
//       read: false
//     });
//     return res.status(200).json({ success: true });
//   }

//   res.status(405).end();
// }
import type { NextApiRequest, NextApiResponse } from 'next'

interface Notification {
  id: string;
  user: string;
  type: string;
  message: string;
  data: {
    amount: string;
    tokenId: string;
    contractId: string;
    status?: string;
    donations?: string;
    name?: string;
  };
  timestamp: number;
  read: boolean;
}

const notifications: Notification[] = [];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "POST") {
    try {
      const { type, payload } = req.body;

      if (type === 'payment-due') {
        const newNotification: Notification = {
          id: `notif-${Date.now()}`,
          user: payload.client.toLowerCase(),
          type: 'payment-due',
          message: `Payment due for Charity NFT ${payload.token_id || payload.tokenId}`,
          data: {
            amount: payload.pay || payload.amount,
            tokenId: payload.token_id || payload.tokenId,
            contractId: payload.contract_id || payload.contractId,
            status: payload.status || "1", // Default to active
            donations: payload.donations || "0",
            name: `Charity NFT #${payload.token_id || payload.tokenId}`
          },
          timestamp: Date.now(),
          read: false
        };
        notifications.push(newNotification);
        return res.status(200).json({ success: true });
      }

      return res.status(400).json({ error: "Invalid notification type" });
    } catch (error) {
      console.error("Error handling POST:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  if (req.method === "GET") {
    try {
      const { user } = req.query;
      
      if (!user) {
        return res.status(400).json({ error: "User address required" });
      }

      const userNotifications = notifications.filter(
        n => n.user.toLowerCase() === user.toString().toLowerCase()
      );

      return res.status(200).json({ notifications: userNotifications });
    } catch (error) {
      console.error("Error handling GET:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  res.status(405).end();
}