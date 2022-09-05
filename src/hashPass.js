const customerPass = process.env.CPASS ||'customerSecret'
const barberPass = process.env.BPASS || 'barberSecret'
const recoverSecret = process.env.RPASS || "recoverSecret"

module.exports = { customerPass, barberPass, recoverSecret }
