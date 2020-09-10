
Parece confuso primero meter campos personales y luego añadir los consentimientos de ese dato personal. Además la "obligatoriedad" la tengo en ambios, una como campo y luego como consentimiento. Quizás haya que separar en "datos medicos" y "consentimientos y datos personales" porque al final todo datos personal debe ir acompañado de un consentimiento y los datos perosnales los tiene que rellenar el paciente una vez por investigacion mientras que los medicos los rellena el investigador cada vez
### Preview de Live Investigation
### Introducir datos de una investigacion



### Encriptar los datos personales de los consentimientos con la clave de la investigación antes de enviarlos

--- HECHO

### Guardar los datos de los consentimientos aprobados por el paciente
### Aprobar e introducir datos de las investigaciones pendientes

### Comprobar que efectivamente cuando se envia el email al paciente, se cambia el status

### Mostrar las investigaciones ya aprobadas


### Falta en panel de usuario coger la clave encriptada de BBDD, desencriptrla con la clave temporal y volverla a encriptar con la contraseña, para añadarile a la investigacion

### ~~Hay que guardar la clave de la investigacion generada en el researcher como clave de la investigacion~~

### Falta crear paciente - El paciente se crea cuando se le añade a la investigaciónm luego él añade su contraseña
### Mostrar las investigaciones pendientes de ser aprobadas
### Hacer test para el modulo de consentimientos. 
### Falta por pasar los de summary, usar mockAxios para simular llamadas a axios
https://testing-library.com/docs/react-testing-library/example-intro
https://www.youtube.com/watch?v=Ngj2f1n9pUw
### Añadir/Actualizar el status cuando una investigacion se ha enviado los consentimientos
### Dibujar como debería ser el acceso a meter datos de un paciente. Voy a "investigaciones live" > Pincho en una investigación, veo en una tabla los pacientes que ya han aprobado los consentimientos y los que no. Puncho en meter datos> hay un desplegable, elijo al paciente que voy a meter datos, >Debajo hay un formulario.