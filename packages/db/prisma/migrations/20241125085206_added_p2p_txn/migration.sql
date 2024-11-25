-- CreateTable
CREATE TABLE "p2pTransfer" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "senderId" TEXT NOT NULL,
    "recepientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "p2pTransfer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "p2pTransfer" ADD CONSTRAINT "p2pTransfer_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "p2pTransfer" ADD CONSTRAINT "p2pTransfer_recepientId_fkey" FOREIGN KEY ("recepientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
