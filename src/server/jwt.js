const jwkSclient =  require('jwks-rsa')
const jwt =  require('jsonwebtoken')

const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImppYk5ia0ZTU2JteFBZck45Q0ZxUms0SzRndyJ9.eyJhdWQiOiIzYmRiOGMxOC0wNWMxLTQ0OTEtODgxNi1iZTIyZmM3ZTRjM2IiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vNzU0YmFjZjctZWZlOC00NDUxLTgwYWUtMDEwNzY2NzE2NGI4L3YyLjAiLCJpYXQiOjE1OTg2MTExODksIm5iZiI6MTU5ODYxMTE4OSwiZXhwIjoxNTk4NjE1MDg5LCJhaW8iOiJBVFFBeS84UUFBQUFObTNQNkFkaml3akhyUVFUZE5hbzNKcnErVlpmL2U1ZURNQ3diQlJuOXBNODNyTlJnYlRTd3dCNURzS21vWE0xIiwiZW1haWwiOiJjYnJpdG9AZGlnaWJvYXJkLmNvbS5iciIsIm5hbWUiOiJDYXJsb3MgQnJ1bm8gR29uw6dhbHZlcyBCcml0byIsIm5vbmNlIjoiZmM0Y2U3ZDUtMDRlNS00ZTI0LTlkNGItYjY2MWM2MTE4ZjM4Iiwib2lkIjoiNjg3NTIxYTktOWE1MS00ZDY5LThlZjAtZTE0NDFkZjQ2NDljIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiY2JyaXRvQGRpZ2lib2FyZC5jb20uYnIiLCJyaCI6IjAuQUFBQTk2eExkZWp2VVVTQXJnRUhabkZrdUJpTTJ6dkJCWkZFaUJhLUl2eC1URHNtQUZBLiIsInNpZCI6Ijk0NjkyYTJiLWU3ZWMtNDBkYS1iNjczLTM5YTY4MTY0ZTY3MiIsInN1YiI6ImpNVmtObjZDel9meFVGLVJuaDhSSldrbDVKLUJ2TmVpaXlHWGt6dzJQeEEiLCJ0aWQiOiI3NTRiYWNmNy1lZmU4LTQ0NTEtODBhZS0wMTA3NjY3MTY0YjgiLCJ1dGkiOiJYU1RDLWJ2VnVrbW0xY3g0RTUzdUFBIiwidmVyIjoiMi4wIn0.hG1aYS-mYbvFd8mfhgY2D2rkcYFd-B_5nXtjoL1AIjq373WXf-5atHlLcVldICdsVqMyPAwQj2AhtuFwCbuMgJMO90YaGhI6pbC9PvxLgKonHZQHbu3R82NGzAgnlfQiMJXyhU3MsD4oBm-16tHLEQ7dyOEhGKDUu6MNs_XozIQI2LY6VNMuK9_QfmhwTb8ijz9g1tgw7iS5-HdZNNeKKKbSMdhYFU48sgidpAydPNANtIUcC4nwvYaGYqC3149Ay5A8UZIzOlnWHa3iZaNQW6W__uagZD9ZZ3U-IwD68xxsucly_8e77WuOCwv2kLt8mZDgndYklCdtLFLzZnQarg"

const decoded = jwt.decode( token, { complete: true } )

const dominio = process.env.DOMINIO

//const header = decoded.header

const verifyOptions = {
    algorithms: ['RS256'],
    header: decoded.header
}

const cliente = jwkSclient({
    jwksUri: `https://login.microsoftonline.com/${dominio}/discovery/keys`
})

const getKey = (header, callback) =>{
    cliente.getSigningKey( header.kid, (err, key) =>{
        const signingKey = key.publicKey || key.rsaPublicKey
        callback( null, signingKey )
    })
}

const verificar = () => {
    return new Promise((resolve, reject)=>{
        jwt.verify( token, getKey, verifyOptions, (err, decoded) =>{
            if(err) reject(err)
            resolve(decoded)
        })
    })
}

const verify = async () => {
    try {
        let decoded = await verificar(  )
        console.log('decoded', decoded);
        
    } catch (error) {
        console.log('error jwt', error.message);
    }
        
}  




module.exports = verify