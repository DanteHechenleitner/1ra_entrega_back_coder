import jsonwebtoken from "jsonwebtoken"

const JWT_SECRET = "2$V;.w;ri[DfvyH,t_VV2Yd%HW#Lx&kv.N;c8unON3Ot905Sm5"

export const tokenGenerator = (user) => {
  const payload = {
    name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    age: user.age,
    rol: user.role,
  }
  const token = jsonwebtoken.sign(payload, JWT_SECRET, { expiresIn: '24h' })
  return token
}

export const isValidToken = (token) => {
  return new Promise((resolve) => {
    jsonwebtoken.verify(token, JWT_SECRET, (error, payload) => {
      if (error) {
        console.log('err', error)
        return resolve(false)
      }
      console.log('payload', payload)
      return resolve(true)
    })
    return token
  })
}