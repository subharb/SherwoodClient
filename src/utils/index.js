/**
 * Function that validates fields from anywhere in the app
 * 
 * @param {Object} field - Field to be validated
 * @param {string} field.value - The value of the input
 * @param {string} field.validation - The type of validations to be done
 * 
 * @returns {Object}  - This object contains the result and the message
 * @returns {boolean} result - This object contains the result and the message
 * @returns {string} messageCode - Code message to be encoded
 */
export function validateField(field){
    const response = {};
    //Si el campo es obligatorio o si tiene un valor, validamos su contenido
    if(field.required || !field.value){
        switch(field.validation){
            case "email" : 
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                response.result = re.test(String(field.value).toLowerCase());
                response.messageCode = "error_email";
                return response;
            case "password":
                response.result = field.value && field.value.length > 6;
                response.messageCode = "error_password"
                return response;
            default:
                console.log("Validación no definida");
                response.result = false;
                response.messageCode = "error_not_defined"
                return response;
        }
    }
    else{
        return true;
    }
    
}

Object.defineProperty(String.prototype, 'hashCode', {
    value: function() {
      var hash = 0, i, chr;
      for (i = 0; i < this.length; i++) {
        chr   = this.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
      }
      return hash;
    }
  });