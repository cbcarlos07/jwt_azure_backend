# JWT Azure

Essa projeto tem como objeto ajudar desenvolvedores que pretendem verificar se o TOKEN gerado pela Azure ainda está válido, ou se expirou.

A partir deste código você elaborar o middleware de proteção das rotas

# Dica:

Para descobrir qual o JWK_URI da organizaçao:

dominio.com.br

https://login.microsoftonline.com/dominio.com.br/v2.0/.well-known/openid-configuration

ou 

https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration