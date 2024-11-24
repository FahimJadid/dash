import express from "express";
import db from "@repo/db/client";
const app = express();

// endpoint that the bank will hit
// when a transaction is made from a user
// and the bank acknowledges the transaction
// and sends the transaction details to the webhook
app.post("/bankWebhook", async (req, res) => {
  //TODO: Add zod validation here?
  // Todo: Check it is a valid request from bank, use a webhook secret
  const paymentInformation: {
    token: string;
    userId: string;
    amount: string;
  } = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
  };

  try {
    await db.$transaction([
      db.balance.updateMany({
        where: {
          userId: paymentInformation.userId,
        },
        data: {
          amount: {
            increment: Number(paymentInformation.amount),
          },
        },
      }),

      db.onRampTransaction.updateMany({
        where: {
          token: paymentInformation.token,
        },
        data: {
          status: "Success",
        },
      }),
    ]);
    res.status(200).json({
      message: "Captured payment",
    });
  } catch (error) {
    console.log(error);
    res.status(411).json({
      message: "while processing webhook",
    });
  }
});

app.listen(5000);
