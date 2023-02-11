import { prisma } from ".";

export const createMediaFiles = (mediaFile) =>{
    return prisma.mediaFile.create({
        data:mediaFile
    })
}