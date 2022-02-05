import request from '@/utils/request.js'
const querystring = require('querystring')

export const registerAPI = (userName, passWord) => {
  return request.post(
    '/api/reguser',
    querystring.stringify({
      username: userName,
      password: passWord
    })
  )
}
