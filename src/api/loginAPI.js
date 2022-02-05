import request from '@/utils/request.js'
const querystring = require('querystring')

export const loginAPI = (userName, passWord) => {
  return request.post(
    '/api/login',
    querystring.stringify({
      username: userName,
      password: passWord
    })
  )
}
