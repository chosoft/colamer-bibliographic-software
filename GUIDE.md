# Nombrar Variables
Para nombrar variables usaremos la tipica convencion "Lower Camel Case" y todas las variables tendran su nombre en **Ingles**
- nombreVariable
- algunaVariable
- variable
- var
- nameOfPerson
- yearsOfChild

# Nombrar Constantes
Para nombras las constantes dentro del entorno de desarrollo usaremos la convencio para nombra constantes denominada "SCREAMING SNAKE CASE" ademas de tambien llevar su nombre en **Ingles**
- CONSTANTE_CON_NOMBRE
- OTRA_CONSTANTE
- SOME_VAR

# Funciones y sus Parametros
Para el nombramiento de funciones y como se deben entregar parametros se tendran 3 cosas en cuenta

## Nombre de las funciones
Para el nombre de las funciones se usara la convencion "Snake Camel Case" y tendran su nombre en **Ingles**

## Parametros
Para los parametros existen dos casos puntuales, en caso de ser mas de dos parametros estos deberan tener su nombre en ingles y con la misma convencion de las variables, en caso de que sean mas de 3 se debera de entregar un objeto JSON a la funcion donde esten todos los valores para que complete su proceso

## Estructura interna
Para la estructura interna de todas las funciones se tendran en cuenta los siguientes aspectos
- Todas las funciones deben de ser de caracter asincronico
- Su sintaxis interna debe ser unicamente en **Ingles**
- Se debe usar dentro de las funciones asincronas el capturador de errores try/catch

# Para el Codigo conjunto
Para poder llevar acabo un desarrollo conjunto cada una de las partes sera encargada de una parte especifica del desarrollo y debera encargarse exclusivamente de ella. Solo se podran hacer cambios al codigo de otra persona por razones de errores que no dejen continuar el sistema y debe ponerse un comentario a los cambios hechos dentro del codigo de la otra persona

## Para tener en cuenta
- Cada parte del programa se trabajara como una rama individual
- Debe ser comprabado el correcto funcionamiento de la aplicacion para poder combinar las ramas
  
- Todos los cambios deben ser combinados a la rama develop
- El commit debe ser un mensaje descriptivo, de preferencia en **Ingles** en donde se comenten los cambios y lo siguiente a desarrollar