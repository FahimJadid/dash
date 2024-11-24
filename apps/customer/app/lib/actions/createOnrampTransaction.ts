"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function createOnrampTransaction(amount: number, provider: string) {
    const session = await getServerSession(authOptions) // getting the current user who's sending the request on the server
    const userId = session?.user.id;
    if (!userId) { // if the user is not found (not logged in), return a message
        return {
            message: "Unauthenticated request",
        }
    }

    /**
     * Original token should be provided by the onramp provider/bank
     * const token = await axios.get("https://api.ebl.com.bd/api/v1/getToken", {
     *  amount: amount,
     * })
     * As we don't have a real provider, we're generating a random token
     * we're generating a random on our own to simulate the process
     */

    const token = generateCustomToken(16)

    await prisma.onRampTransaction.create({
        data: {
            userId,
            amount: amount,
            provider,
            token: token,
            status: 'Processing',
            startTime: new Date(),
          },
    })

    return {
        message: "Transaction initialized successfully",
    }
}

function generateCustomToken(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters[randomIndex];
    }
    return token;
  }
