const azureJWT = require('azure-jwt-verify')

const jwtToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImppYk5ia0ZTU2JteFBZck45Q0ZxUms0SzRndyJ9.eyJhdWQiOiIzYmRiOGMxOC0wNWMxLTQ0OTEtODgxNi1iZTIyZmM3ZTRjM2IiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vNzU0YmFjZjctZWZlOC00NDUxLTgwYWUtMDEwNzY2NzE2NGI4L3YyLjAiLCJpYXQiOjE1OTg2MTExODksIm5iZiI6MTU5ODYxMTE4OSwiZXhwIjoxNTk4NjE1MDg5LCJhaW8iOiJBVFFBeS84UUFBQUFObTNQNkFkaml3akhyUVFUZE5hbzNKcnErVlpmL2U1ZURNQ3diQlJuOXBNODNyTlJnYlRTd3dCNURzS21vWE0xIiwiZW1haWwiOiJjYnJpdG9AZGlnaWJvYXJkLmNvbS5iciIsIm5hbWUiOiJDYXJsb3MgQnJ1bm8gR29uw6dhbHZlcyBCcml0byIsIm5vbmNlIjoiZmM0Y2U3ZDUtMDRlNS00ZTI0LTlkNGItYjY2MWM2MTE4ZjM4Iiwib2lkIjoiNjg3NTIxYTktOWE1MS00ZDY5LThlZjAtZTE0NDFkZjQ2NDljIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiY2JyaXRvQGRpZ2lib2FyZC5jb20uYnIiLCJyaCI6IjAuQUFBQTk2eExkZWp2VVVTQXJnRUhabkZrdUJpTTJ6dkJCWkZFaUJhLUl2eC1URHNtQUZBLiIsInNpZCI6Ijk0NjkyYTJiLWU3ZWMtNDBkYS1iNjczLTM5YTY4MTY0ZTY3MiIsInN1YiI6ImpNVmtObjZDel9meFVGLVJuaDhSSldrbDVKLUJ2TmVpaXlHWGt6dzJQeEEiLCJ0aWQiOiI3NTRiYWNmNy1lZmU4LTQ0NTEtODBhZS0wMTA3NjY3MTY0YjgiLCJ1dGkiOiJYU1RDLWJ2VnVrbW0xY3g0RTUzdUFBIiwidmVyIjoiMi4wIn0.hG1aYS-mYbvFd8mfhgY2D2rkcYFd-B_5nXtjoL1AIjq373WXf-5atHlLcVldICdsVqMyPAwQj2AhtuFwCbuMgJMO90YaGhI6pbC9PvxLgKonHZQHbu3R82NGzAgnlfQiMJXyhU3MsD4oBm-16tHLEQ7dyOEhGKDUu6MNs_XozIQI2LY6VNMuK9_QfmhwTb8ijz9g1tgw7iS5-HdZNNeKKKbSMdhYFU48sgidpAydPNANtIUcC4nwvYaGYqC3149Ay5A8UZIzOlnWHa3iZaNQW6W__uagZD9ZZ3U-IwD68xxsucly_8e77WuOCwv2kLt8mZDgndYklCdtLFLzZnQarg"
//const jwtToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImppYk5ia0ZTU2JteFBZck45Q0ZxUms0SzRndyJ9.eyJhdWQiOiIzYmRiOGMxOC0wNWMxLTQ0OTEtODgxNi1iZTIyZmM3ZTRjM2IiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vNzU0YmFjZjctZWZlOC00NDUxLTgwYWUtMDEwNzY2NzE2NGI4L3YyLjAiLCJpYXQiOjE1OTg2MjM0MTMsIm5iZiI6MTU5ODYyMzQxMywiZXhwIjoxNTk4NjI3MzEzLCJhaW8iOiJBVFFBeS84UUFBQUF5TmUvbHBsRUVESVhzaGtZOHdsSjhTVjlrVTBZMUFocTRrL3doRWFQMytqU2lIODNYWm1SaG5ON1Yxc3poTG1LIiwiZW1haWwiOiJjYnJpdG9AZGlnaWJvYXJkLmNvbS5iciIsIm5hbWUiOiJDYXJsb3MgQnJ1bm8gR29uw6dhbHZlcyBCcml0byIsIm5vbmNlIjoiOGU1NjE1OGQtYWMwZC00YWRiLWEwNjItNTFjNmQ0YjFiYjA3Iiwib2lkIjoiNjg3NTIxYTktOWE1MS00ZDY5LThlZjAtZTE0NDFkZjQ2NDljIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiY2JyaXRvQGRpZ2lib2FyZC5jb20uYnIiLCJzaWQiOiJjNGVlNjJjOS1hODQxLTQ3N2UtOGI3MS1mMWMwYTdhNDhhMzMiLCJzdWIiOiJqTVZrTm42Q3pfZnhVRi1Sbmg4UkpXa2w1Si1Cdk5laWl5R1hrencyUHhBIiwidGlkIjoiNzU0YmFjZjctZWZlOC00NDUxLTgwYWUtMDEwNzY2NzE2NGI4IiwidXRpIjoiR0IxbjU3N2RJMC1YSkMwUjdMMFdBdyIsInZlciI6IjIuMCJ9.gekWHNgYXyNjP7s_bSSaxk6jcMpx2XjroYsbhvffQMPQ8AIhBNpJ7lNWeTZupEaXuLemxsDfhnUdrmnjaL8kAgT7y6E7hxkrtGo5AZvLA7DdTAuuSbam5Dkz4z1_Izf74qdtgN99mjU0qWoFmimsKAacSlNYQRgFAkvDxndvXw7AgOkqQ60w2vlhArewaQiTELv-HCVemRs5_ICCzwtgHdECtse9cr20QXLj0bXLhFaXnG9fVYRgA9Nz8IHOjoUGe4_l5PEsR4dYE2zA8BXwnvwsfroBigZPB_oqcu2ZpnAK3hQLHbSzoYtvw-97C1GMp85nADRgi-aWRhIy6k3rDg"

const config = {
    JWK_URI: "https://login.microsoftonline.com/754bacf7-efe8-4451-80ae-0107667164b8/discovery/v2.0/keys",
    ISS: 'https://login.microsoftonline.com/754bacf7-efe8-4451-80ae-0107667164b8/v2.0',
    AUD: "3bdb8c18-05c1-4491-8816-be22fc7e4c3b"

}

const verificarJWT = async () =>{
    
    try {
        
        let decoded = await azureJWT.verify(jwtToken, config)
        console.log('decoded', JSON.parse( decoded ) );
        
    } catch (error) {
        console.log('error', JSON.parse( error ));
    }

}

module.exports = verificarJWT