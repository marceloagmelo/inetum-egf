# Liferay 7.4 Workspace


## Requisitos

*  Docker
*  JDK 1.8 ou JDK 11
*  Blade - https://help.liferay.com/hc/en-us/articles/360017885232-Installing-Blade-CLI

## Instruções ambiente de Desenvolvimento

Caso tenha um servidor MySQL local executando na sua máquina, você deverá usá-lo, pois se não tiver use o MySQL no container docker e irá expor na porta 3306.

Primeiro, inicie o bundle:

```
blade server init
```

Feito isso, você deve executar o start do servidor:

```
blade server start
```

Agora você pode iniciar o seu bundle local usando:

```
blade server start
```

Para executar em modo debug, utilize:

```
blade server start -d
```

Isso fará com o que o tomcat aceite conexões na porta 8000 para debug remoto.

Após o start do ambiente local, você poderá acessar a instância em: http://localhost:8080/, usuário **test@egf.pt** e senha **test**

Para parar o ambiente local, utilize:

```
blade server stop
```

Recomendável ler o tutorial sobre o Liferay Workspace para entender o mecanismo de desenvolvimento dos novos plugins, em: 

* https://learn.liferay.com/

Contaiber Mysql
Para arrancar exwecute o comando abaixo:

```
docker-compose up -d

```


