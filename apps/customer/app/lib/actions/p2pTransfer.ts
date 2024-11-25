'use server'

import { getServerSession } from 'next-auth'
import prisma from '@repo/db/client'
import { authOptions } from "../auth";

export async function p2pTransfer(recipientPhone: string, amountInCents: number) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user || !session.user.id) {
    return { success: false, message: 'User not authenticated' }
  }

  const senderId = session.user.id

  const recipient = await prisma.user.findFirst({
    where: { number: recipientPhone }
  })

  if (!recipient) {
    return { success: false, message: 'Sender not found' }
  }

  try {
    await prisma.$transaction(async (tx) => {
      // Lock sender's balance row so that no other transaction can modify it
      // For example, if two transfers are initiated at the same time, 
      // We don't want them to both succeed and overdraft the account balance
      await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${senderId} FOR UPDATE`;
        // Check if sender has sufficient balance
      const senderBalance = await tx.balance.findUnique({
        where: { userId: senderId },
      });

      if(!senderBalance || senderBalance.amount < amountInCents) {
        throw new Error('Insufficient balance')
      }

      // Update recipient's balance
      await tx.balance.update({
        where: { userId: senderId },
        data: { amount: { decrement: amountInCents } },
      })

      await tx.balance.update({
        where: { userId: recipient.id },
        data: { amount: { increment: amountInCents } },
      })

      await tx.p2pTransfer.create({
        data: {
            senderId: senderId,
            recepientId: recipient.id,
            amount: amountInCents,
        }
      })

    })

    return { success: true }
  } catch (error) {
    console.error('Transfer failed:', error)
    return { success: false, error: 'Transfer failed' }
  }
}

