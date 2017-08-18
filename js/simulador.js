$.fn.exists = function() {
  return this.length > 0;
}

function Unidades(num) {
  switch (num) {
    case 1:
      return "UN";
    case 2:
      return "DOS";
    case 3:
      return "TRES";
    case 4:
      return "CUATRO";
    case 5:
      return "CINCO";
    case 6:
      return "SEIS";
    case 7:
      return "SIETE";
    case 8:
      return "OCHO";
    case 9:
      return "NUEVE";
  }

  return "";
} //Unidades()

function Decenas(num) {

  var decena = Math.floor(num / 10);
  var unidad = num - (decena * 10);

  switch (decena) {
    case 1:
      switch (unidad) {
        case 0:
          return "DIEZ";
        case 1:
          return "ONCE";
        case 2:
          return "DOCE";
        case 3:
          return "TRECE";
        case 4:
          return "CATORCE";
        case 5:
          return "QUINCE";
        default:
          return "DIECI" + Unidades(unidad);
      }
    case 2:
      switch (unidad) {
        case 0:
          return "VEINTE";
        default:
          return "VEINTI" + Unidades(unidad);
      }
    case 3:
      return DecenasY("TREINTA", unidad);
    case 4:
      return DecenasY("CUARENTA", unidad);
    case 5:
      return DecenasY("CINCUENTA", unidad);
    case 6:
      return DecenasY("SESENTA", unidad);
    case 7:
      return DecenasY("SETENTA", unidad);
    case 8:
      return DecenasY("OCHENTA", unidad);
    case 9:
      return DecenasY("NOVENTA", unidad);
    case 0:
      return Unidades(unidad);
  }
} //Unidades()

function DecenasY(strSin, numUnidades) {
  if (numUnidades > 0)
    return strSin + " Y " + Unidades(numUnidades)

  return strSin;
} //DecenasY()

function Centenas(num) {
  var centenas = Math.floor(num / 100);
  var decenas = num - (centenas * 100);

  switch (centenas) {
    case 1:
      if (decenas > 0)
        return "CIENTO " + Decenas(decenas);
      return "CIEN";
    case 2:
      return "DOSCIENTOS " + Decenas(decenas);
    case 3:
      return "TRESCIENTOS " + Decenas(decenas);
    case 4:
      return "CUATROCIENTOS " + Decenas(decenas);
    case 5:
      return "QUINIENTOS " + Decenas(decenas);
    case 6:
      return "SEISCIENTOS " + Decenas(decenas);
    case 7:
      return "SETECIENTOS " + Decenas(decenas);
    case 8:
      return "OCHOCIENTOS " + Decenas(decenas);
    case 9:
      return "NOVECIENTOS " + Decenas(decenas);
  }

  return Decenas(decenas);
} //Centenas()

function Seccion(num, divisor, strSingular, strPlural) {
  var cientos = Math.floor(num / divisor)
  var resto = num - (cientos * divisor)

  var letras = "";

  if (cientos > 0)
    if (cientos > 1)
      letras = Centenas(cientos) + " " + strPlural;
    else
      letras = strSingular;

  if (resto > 0)
    letras += "";

  return letras;
} //Seccion()

function Miles(num) {
  var divisor = 1000;
  var cientos = Math.floor(num / divisor)
  var resto = num - (cientos * divisor)

  var strMiles = Seccion(num, divisor, "UN MIL", "MIL");
  var strCentenas = Centenas(resto);

  if (strMiles == "")
    return strCentenas;

  return strMiles + " " + strCentenas;
} //Miles()

function Millones(num) {
  var divisor = 1000000;
  var cientos = Math.floor(num / divisor)
  var resto = num - (cientos * divisor)

  var strMillones = Seccion(num, divisor, "UN MILLON", "MILLONES");
  var strMiles = Miles(resto);

  if (strMillones == "")
    return strMiles;

  return strMillones + " " + strMiles;
} //Millones()

function NumeroALetras(num) {
  var data = {
    numero: num,
    enteros: Math.floor(num),
    centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
    letrasCentavos: "",
    letrasMonedaPlural: 'PESOS', //"PESOS", 'Dólares', 'Bolívares', 'etcs'
    letrasMonedaSingular: 'PESO', //"PESO", 'Dólar', 'Bolivar', 'etc'

    letrasMonedaCentavoPlural: "CENTAVOS",
    letrasMonedaCentavoSingular: "CENTAVO"
  };

  if (data.centavos > 0) {
    data.letrasCentavos = "CON " + (function() {
      if (data.centavos == 1)
        return Millones(data.centavos) + " " + data.letrasMonedaCentavoSingular;
      else
        return Millones(data.centavos) + " " + data.letrasMonedaCentavoPlural;
      }
    )();
  };

  if (data.enteros == 0)
    return "CERO " + data.letrasMonedaPlural + " " + data.letrasCentavos;
  if (data.enteros == 1)
    return Millones(data.enteros) + " " + data.letrasMonedaSingular + " " + data.letrasCentavos;
  else
    return Millones(data.enteros) + " " + data.letrasMonedaPlural + " " + data.letrasCentavos;
  }

  // Capitalizar la primera letra
  function jsUcfirst(string) {
  	return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function formatCurrency() {
    //number-format the user input
    this.value = parseFloat(this.value.replace(/,/g, '')).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  function formatCurrencyOfNumber(cantidad) {
    //number-format the user input
    if(typeof cantidad === 'string')
      return parseFloat(cantidad.replace(/,/g, '')).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    else {
      return cantidad.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  }


  $(".input-number").keydown(function(e) {
  	// Allow: backspace, delete, tab, escape, enter and .
  	if ($.inArray(e.keyCode, [
  		46,
  		8,
  		9,
  		27,
  		13,
  		190
  	]) !== -1 ||
  	// Allow: Ctrl+A
  	(e.keyCode == 65 && e.ctrlKey === true) ||
  	// Allow: home, end, left, right
  	(e.keyCode >= 35 && e.keyCode <= 39)) {
  		// let it happen, don't do anything
  		return;
  	}
  	// Ensure that it is a number and stop the keypress
  	if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
  		e.preventDefault();
  	}
  });


// Dinerito

const percepciones = $('#percepciones')
percepciones.on('keyup', function(){
  $(this).next('.input-success').text(jsUcfirst(NumeroALetras(this.value).toLowerCase()))

})
percepciones.on('change', formatCurrency)

let inputsSolicitud = $('input')
cargaEventosInputs(inputsSolicitud)

function cargaEventosInputs (inputsSolicitud) {
  inputsSolicitud.each(function() {
    let input = $(this)
    input.change(function() {
      if (input.val() !== '') {
        if (input.attr('id') === 'celular') { // pregunto cuando sea el campo del celular
          let regex = /^\(?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
          if (regex.test(input.val())) { // valido el telefono
            $('#loader-phone-message').removeClass('hidden') // si pasa se muestra loader

            // aqui se enviaria el mensaje, solo se simula un periodo de tiempo
            setTimeout(function() {
              $('#loader-phone-message').addClass('hidden')
              $('#phone-message-alert').removeClass('hidden')
            }, 4000);
            input.siblings('.input-success').html(input.val());
          } else {
            input.siblings('.input-error').html('No es un número de teléfono válido');
            input.addClass('invalid')
          }
        } else {

          input.addClass('valid')
          if(!input.hasClass('input-number')){
            input.siblings('.input-success').html(input.val());
          }
        }
      }
    })
  })

}
const optsDependencias = $("input[name='dependencia']")
const otraDependencia = $("#otraDependencia")

optsDependencias.each(function() {
  let input = $(this)
  input.change(function(){
    if(input.val() == 'otra'){
      otraDependencia.removeClass('hidden')
      inputsSolicitud = $('input')
      cargaEventosInputs(inputsSolicitud)
    }
  })
})


$('[data-toggle="tooltip"]').tooltip()

const btnSolicitarOfertas = $('#btnSolicitarOfertas')
btnSolicitarOfertas.on('click', function() {
  $('#loader-ofertas-credito').removeClass('hidden')
  setTimeout(function() {
    $('#loader-ofertas-credito').addClass('hidden')
    $('#ofertas-credito').removeClass('hidden')
    btnSolicitarOfertas.addClass('hidden')
  }, 4000);
})

const btnMasOfertas = $('#btn-mas-ofertas')
btnMasOfertas.on('click', function() {
  $('#todas-ofertas').removeClass('hidden')
  btnMasOfertas.addClass('hidden')
})

const btnsEligeOferta = $('.choose-credit')
btnsEligeOferta.each(function(){
  let btn = $(this)
  btn.click(function(){
    $('#datos-basicos').removeClass('hidden')
    inputsSolicitud = $('input')
    let cleave = new Cleave('#celular', { // formatear numero celular
      phone: true,
      phoneRegionCode: 'MX'
    });
    cargaEventosInputs(inputsSolicitud)
    window.scrollTo(0,document.body.scrollHeight);
    // al ingresar el codigo SMS recibido, si se escribe un numero paso enseguida al siguiente input para una facil captura del codigo
    var indexInputCode = 0;
    $(".code-input").bind('keyup', function() {

      var value = $(this).val()
      var regex = /^\d+$/
      if (regex.test(value)) {
        if (indexInputCode < 4){
          $(this).next().focus()
        }
        if (indexInputCode == 4) {
          document.getElementById('btnContinuarSolicitud').classList.remove('hidden')
        }
        indexInputCode++
      }
    });
  })
})
